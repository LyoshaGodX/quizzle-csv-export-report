const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');
const {execFileSync} = require('node:child_process');

const report = path.resolve(__dirname, '..');
const sourceRepo = path.resolve(process.argv[2] || path.join(report, '../Quizzle'));
const sourceDirectory = 'docs/coursework/csv-export';
const sourceRoot = path.join(sourceRepo, sourceDirectory);
const snapshotFiles = new Set(['.gitattributes', 'README.md', 'index.html', 'speech.md',
    'scripts/seed-demo.cjs', 'scripts/verify-artifacts.cjs',
    'scripts/verify-downloads.cjs', 'scripts/verify-lint.cjs']);
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: sourceRepo, encoding: 'utf8'}).trim();
assert.ok(sourceCommit.startsWith('4ead0c3'), 'Expected the recorded final Quizzle documentation commit.');
assert.equal(execFileSync('git', ['status', '--porcelain', '--', sourceDirectory],
    {cwd: sourceRepo, encoding: 'utf8'}).trim(), '', 'Source artifacts must be clean.');

const walk = (directory, prefix = '') => fs.readdirSync(directory, {withFileTypes: true})
    .flatMap((entry) => {
        const relative = prefix + entry.name;
        return entry.isDirectory() ? walk(path.join(directory, entry.name), relative + '/') : [relative];
    }).sort();

const files = walk(sourceRoot).map((sourcePath) => {
    const reportPath = snapshotFiles.has(sourcePath) ? 'source-artifacts/' + sourcePath : sourcePath;
    const sourceBytes = fs.readFileSync(path.join(sourceRoot, sourcePath));
    const reportBytes = fs.readFileSync(path.join(report, reportPath));
    assert.deepEqual(reportBytes, sourceBytes, `Changed source artifact: ${sourcePath}`);
    return {sourcePath, reportPath, bytes: sourceBytes.length, sha256: sha256(sourceBytes)};
});
const result = {recordedAt: new Date().toISOString(),
    sourceRepository: 'https://github.com/LyoshaGodX/Quizzle', sourceCommit, sourceDirectory,
    fileCount: files.length, files};
fs.writeFileSync(path.join(report, 'evidence/source-manifest.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({sourceCommit, originalArtifacts: files.length, allCopiesMatch: true}));
