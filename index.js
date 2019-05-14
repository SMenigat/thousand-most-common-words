const FS = require("fs");
const PATH = require("path");

const cache = {
  parsedDict: null,
  words: {}
};

const getParsedDictionary = () => {
  if (!cache.parsedDict) {
    let parsedDict = [];
    try {
      const rawDict = FS.readFileSync(`${__dirname}/dictionary.json`);
      parsedDict = JSON.parse(rawDict);
    } catch (e) {
      console.error("Error while parsing dictionary");
      console.error(e);
    }
    cache.parsedDict = parsedDict;
  }
  return cache.parsedDict;
};

const getWordsFromWordFile = path => {
  if (!cache.words[path]) {
    let words = [];
    try {
      const rawFile = FS.readFileSync(PATH.join(__dirname, path));
      const parsedFile = JSON.parse(rawFile);
      words = parsedFile.words;
    } catch (e) {
      console.error("Error while parsing word file");
      console.error(e);
    }
    cache.words[path] = words;
  }
  return cache.words[path];
};

const getAllLanguageCodes = () => {
  const dict = getParsedDictionary();
  return dict.map(lang => lang.code);
};

const getAllLanguageNames = () => {
  const dict = getParsedDictionary();
  return dict.map(lang => lang.name);
};

const getAllLanguageNativeNames = () => {
  const dict = getParsedDictionary();
  return dict.map(lang => lang.nativeName);
};

const getWordsByLanguageCode = code => {
  const dict = getParsedDictionary();
  const langFilePath = dict
    .filter(lang => lang.code === code)
    .map(lang => lang.wordFilePath);
  if (langFilePath.length > 0) {
    return getWordsFromWordFile(langFilePath[0]);
  }
  return [];
};

const getWordsByLanguageName = name => {
  const dict = getParsedDictionary();
  const langFilePath = dict
    .filter(lang => lang.name === name)
    .map(lang => lang.wordFilePath);
  if (langFilePath.length > 0) {
    return getWordsFromWordFile(langFilePath[0]);
  }
  return [];
};

const getWordsByLanguageNativeName = nativeName => {
  const dict = getParsedDictionary();
  const langFilePath = dict
    .filter(lang => lang.nativeName === nativeName)
    .map(lang => lang.wordFilePath);
  if (langFilePath.length > 0) {
    return getWordsFromWordFile(langFilePath[0]);
  }
  return [];
};

module.exports = {
  getAllLanguageCodes,
  getAllLanguageNames,
  getAllLanguageNativeNames,
  getWordsByLanguageCode,
  getWordsByLanguageName,
  getWordsByLanguageNativeName
};

console.log(getAllLanguageCodes());
