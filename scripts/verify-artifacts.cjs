const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');

const report = path.resolve(__dirname, '..');
const checked = [];
const headingIds = (markdown) => {
    const counts = new Map();
    return new Set([...markdown.matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) => {
        const base = match[1].trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/ /g, '-');
        const count = counts.get(base) || 0;
        counts.set(base, count + 1);
        return count ? `${base}-${count}` : base;
    }));
};

const checkTarget = (document, target) => {
    if (/^https?:/.test(target)) return;
    const [relative, anchor] = target.split('#');
    const filename = relative ? path.resolve(report, path.dirname(document), decodeURIComponent(relative))
        : path.join(report, document);
    assert.ok(fs.existsSync(filename), `Broken local reference in ${document}: ${target}`);
    if (anchor && filename.endsWith('.md')) {
        assert.ok(headingIds(fs.readFileSync(filename, 'utf8')).has(decodeURIComponent(anchor)),
            `Broken Markdown anchor in ${document}: ${target}`);
    }
    checked.push({document, target});
};

// Historical source snapshots retain paths from Quizzle and are not navigation documents.
for (const document of ['README.md', 'speech.md', 'ARTIFACTS.md', 'PUBLICATION.md', 'defense/protocol-template.md']) {
    const text = fs.readFileSync(path.join(report, document), 'utf8');
    for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) checkTarget(document, match[1]);
}

const html = fs.readFileSync(path.join(report, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (match[1].startsWith('#')) {
        assert.ok(html.includes(`id="${match[1].slice(1)}"`), `Broken section link: ${match[1]}`);
    } else checkTarget('index.html', match[1]);
}
assert.ok(html.includes('<html lang="ru">'));
assert.ok(html.includes('name="viewport"'));
const embeddedImages = (fs.readFileSync(path.join(report, 'README.md'), 'utf8').match(/!\[/g) || []).length;
assert.equal(embeddedImages, 11);
const manifest = JSON.parse(fs.readFileSync(path.join(report, 'evidence/source-manifest.json'), 'utf8'));
assert.equal(manifest.files.length, manifest.fileCount);
for (const file of manifest.files) {
    const bytes = fs.readFileSync(path.join(report, file.reportPath));
    assert.equal(bytes.length, file.bytes, `Wrong size: ${file.reportPath}`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256,
        `Changed original artifact: ${file.reportPath}`);
}
console.log(JSON.stringify({checkedAt: new Date().toISOString(), localReferences: checked.length,
    embeddedReportImages: embeddedImages, sourceArtifactsVerified: manifest.files.length, passed: true,
    limitation: 'Local links, anchors and byte integrity only; not rendered-browser or remote-link verification.', checked}, null, 2));
