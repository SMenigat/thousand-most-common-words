const fs = require("fs");
const mdTable = require("markdown-table");
const Storage = require("./storage");

// update dictionary
Storage.updateDictionary();

// create language table
const dictionary = Storage.getDictionary();
const tableContent = [
  ["Language Code", "Language Name", "Language Native Name", "Word File"],
  ...dictionary.map(lang => [
    lang.code,
    lang.name,
    lang.nativeName,
    `[Words](${lang.wordFilePath})`
  ])
];
const renderedTable = mdTable(tableContent);
fs.writeFileSync(
  `${__dirname}/../docs/availableLanguages.md`,
  `## Available Languages (${dictionary.length})\n\n${renderedTable}`
);
console.log("Language table regenerated");

// regenerate readme
const readme = [];
readme.push(fs.readFileSync(`${__dirname}/../docs/base.md`));
readme.push(fs.readFileSync(`${__dirname}/../docs/usage.md`));
readme.push(fs.readFileSync(`${__dirname}/../docs/availableLanguages.md`));
readme.push(fs.readFileSync(`${__dirname}/../docs/sources.md`));
fs.writeFileSync(`${__dirname}/../README.md`, readme.join("\n\n"));
console.log("Readme regnerated");
