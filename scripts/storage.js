const fs = require("fs");

const wordsDir = `${__dirname}/../words`;
const dictionaryFilePath = `${__dirname}/../dictionary.json`;

const storeLanguage = (
  languageCode,
  languageName,
  languageNativeName,
  words
) => {
  // write word-file
  const wordFileContent = JSON.stringify(
    {
      languageCode: languageCode,
      languageName: languageName,
      languageNativeName: languageNativeName,
      words: words
    },
    null,
    2
  );
  const fileName = languageCode ? languageCode : `todo-${languageName}`;
  fs.writeFileSync(`${wordsDir}/${fileName}.json`, wordFileContent);
};

const updateDictionary = () => {
  const langDict = [];
  const allWordFiles = fs.readdirSync(wordsDir);
  allWordFiles.forEach(wordFile => {
    try {
      const wordFileRaw = fs.readFileSync(`${wordsDir}/${wordFile}`);
      const wordFileParsed = JSON.parse(wordFileRaw);
      langDict.push({
        code: wordFileParsed.languageCode,
        name: wordFileParsed.languageName,
        nativeName: wordFileParsed.languageNativeName,
        wordFilePath: `words/${wordFile}`
      });
    } catch (e) {
      console.log("Error while opening and parsing", wordFile);
      console.log(e);
    }
  });
  const dictionaryFileContent = JSON.stringify(langDict, null, 2);
  fs.writeFileSync(dictionaryFilePath, dictionaryFileContent);
  console.log(`Updated dictionary to contain ${langDict.length} languages`);
};

module.exports = {
  storeLanguage,
  updateDictionary
};
