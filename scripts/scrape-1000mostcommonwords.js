const request = require("request-promise");
const cheerio = require("cheerio");
const ISO6391 = require("iso-639-1");
const Storage = require("./storage");

const load = async url => {
  return await request({
    uri: url,
    transform: function(body) {
      return cheerio.load(body);
    }
  });
};

const getAllAvailableLanguages = async () => {
  const availableLanguages = [];
  const $langPage = await load("https://1000mostcommonwords.com/");
  $langPage(".entry-content p a").each((index, $item) => {
    const $link = $langPage($item);
    const languageName = $link.text().trim();
    const languageCode = ISO6391.getCode(languageName);
    availableLanguages.push({
      languageCode: languageCode,
      languageName: languageName,
      languageNativeName: ISO6391.getNativeName(languageCode),
      listUrl: $link.attr("href")
    });
  });
  return availableLanguages;
};

const get1000Words = async url => {
  const words = [];
  try {
    const $wordPage = await load(url);
    $wordPage(".entry-content table tr").each((index, $row) => {
      const $fullRow = $wordPage($row);
      const rank = $fullRow
        .find("td")
        .eq(0)
        .text();
      const targetWord = $fullRow
        .find("td")
        .eq(1)
        .text();
      const englishWord = $fullRow
        .find("td")
        .eq(2)
        .text();
      if (!isNaN(rank)) {
        words.push({
          rank: parseInt(rank, 10),
          targetWord: targetWord,
          englishWord: englishWord
        });
      }
    });
  } catch (e) {
    console.log("Error while trying to download words from", url);
  }
  return words;
};

(async () => {
  // load all available languages
  const allLanguages = await getAllAvailableLanguages();

  console.log(`Downloaded list of languages (${allLanguages.length})`);

  // create a dictionary for every single one of them
  for (const lang of allLanguages) {
    // download 1000 words
    const words = await get1000Words(lang.listUrl);

    // store this download
    if (words.length > 0) {
      Storage.storeLanguage(
        lang.languageCode,
        lang.languageName,
        lang.languageNativeName,
        words
      );

      console.log("Downloaded and stored 1000 words for", lang.languageName);
    }
  }

  // update dictionary
  Storage.updateDictionary();
})();
