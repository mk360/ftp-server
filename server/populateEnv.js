// basically reproducing what the dot-env package did
const fs = require("fs");
const os = require("os");
const env = fs.readFileSync('../.env', 'utf-8');
const entries = env.split(os.EOL).filter(e => e).map(i => i.trim());
const entriesRegex = /^(?<entryName>[A-z-_]+)\s*=\s*(?<entryValue>.+)/;

for (let entry of entries) {
    const entriesRegexResult = entriesRegex.exec(entry);
    if (entriesRegexResult) {
        const { entryName, entryValue } = entriesRegexResult.groups;    
        if (!process.env[entryName]) {
            process.env[entryName] = entryValue;
        }
    }
}
