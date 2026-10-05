const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');

const report = path.resolve(__dirname, '..');
const base = new URL(process.argv[2] || 'https://lyoshagodx.github.io/quizzle-csv-export-report/');
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');

async function main() {
    const checks = [];
    const check = async (relative, local) => {
        const url = new URL(relative, base).href;
        const response = await fetch(url, {signal: AbortSignal.timeout(30000)});
        assert.equal(response.status, 200, `HTTP failure: ${url}`);
        const bytes = Buffer.from(await response.arrayBuffer());
        const original = fs.readFileSync(path.join(report, local));
        // Git stores authored HTML with LF; original CSV and image bytes are never normalized.
        const comparison = local.endsWith('.html') ? 'HTML with Git LF normalization' : 'exact bytes';
        const expected = local.endsWith('.html') ? Buffer.from(original.toString('utf8').replace(/\r\n/g, '\n')) : original;
        assert.equal(hash(bytes), hash(expected), `Published content differs: ${url}`);
        checks.push({url, status: response.status, bytes: bytes.length, sha256: hash(bytes), comparison, matchesLocal: true});
        return bytes;
    };
    const html = (await check('./', 'index.html')).toString('utf8');
    const resources = new Set([...html.matchAll(/(?:src|href)="([^"]+)"/g)]
        .map((match) => match[1]).filter((target) => !/^(https?:|#)/.test(target)));
    for (const resource of resources) await check(resource, decodeURIComponent(resource));
    console.log(JSON.stringify({checkedAt: new Date().toISOString(), passed: true, checks,
        limitation: 'HTTP and exact content comparison only; not visual or interactive browser verification.'}, null, 2));
}

main().catch((error) => {console.error(error); process.exitCode = 1;});
