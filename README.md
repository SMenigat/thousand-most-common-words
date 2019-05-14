# 1000-most-common-words

1000 most common words in a lot of languages.

## Usage

### getAllLanguageCodes()

Returns array of available language codes (`ISO 639`).

```javascript
// import library
const MostCommonWords = require('1000-most-common-words');

// load all available language codes
const allCodes = MostCommonWords.getAllLanguageCodes();

console.log(allCodes); // ['en', 'es', 'fr', 'de']
```

### getAllLanguageNames()

Returns array of available language names (english).

```javascript
// import library
const MostCommonWords = require('1000-most-common-words');

// load all available language names
const allNames = MostCommonWords.getAllLanguageNames();

console.log(allNames); // ['English', 'Spanish', 'French', 'German']
```

### getAllLanguageNativeNames()

Returns array of available native language names.

```javascript
// import library
const MostCommonWords = require('1000-most-common-words');

// load all available language names
const allNativeNames = MostCommonWords.getAllLanguageNativeNames();

console.log(allNativeNames); // ['English', 'Español', 'Français', 'Deutsch']
```

### getWordsByLanguageCode( code )

Returns ranked word objects (`{ rank, targetWord, englishWord }`) by `ISO 639` language code. 

Returns an empty array if language is not available.

```javascript
// import library
const MostCommonWords = require('1000-most-common-words');

// load word objects
const words = MostCommonWords.getWordsByLanguageCode('es');

console.log(words);
/*
[
  {
    "rank": 1,
    "targetWord": "como",
    "englishWord": "as"
  },
  {
    "rank": 2,
    "targetWord": "I",
    "englishWord": "I"
  },
  ...
]
*/
```

### getWordsByLanguageName( name )

Returns ranked word objects (`{ rank, targetWord, englishWord }`) by language name (english). 

Returns an empty array if language is not available.

```javascript
// import library
const MostCommonWords = require('1000-most-common-words');

// load word objects
const words = MostCommonWords.getWordsByLanguageName('Spanish');

console.log(words);
/*
[
  {
    "rank": 1,
    "targetWord": "como",
    "englishWord": "as"
  },
  {
    "rank": 2,
    "targetWord": "I",
    "englishWord": "I"
  },
  ...
]
*/
```

### getWordsByLanguageNativeName( nativeName )

Returns ranked word objects (`{ rank, targetWord, englishWord }`) by language native name. 

Returns an empty array if language is not available.

```javascript
// import library
const MostCommonWords = require('1000-most-common-words');

// load word objects
const words = MostCommonWords.getWordsByLanguageNativeName('Español');

console.log(words);
/*
[
  {
    "rank": 1,
    "targetWord": "como",
    "englishWord": "as"
  },
  {
    "rank": 2,
    "targetWord": "I",
    "englishWord": "I"
  },
  ...
]
*/
```

## Sources

- [1000mostcommonwords.com](https://1000mostcommonwords.com/)

