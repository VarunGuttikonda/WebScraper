const {
    createBrowser,
    createPageAndNavigate,
    extractAllInOneGo,
    pageAndBrowswerClose,
  } = require("./scrapeUtils");
  async function scrape() {
    try {
      const browser = await createBrowser();
      const page = await createPageAndNavigate(browser);
      const extractedArray = await extractAllInOneGo(browser, page);
      // Create JSON and CSV code goes here
      await pageAndBrowswerClose(page, browser);
      return extractedArray;
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
  
  module.exports = scrape;
  