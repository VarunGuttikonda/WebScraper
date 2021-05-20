const puppeteer = require("puppeteer");
const constants = require("./constants");
const { print, isNull, errorHandler } = require("./utils");

/**
 * A function to create browswer
 * @returns {puppeteer.Browser} A browswer instance
 * @async
 */
async function createBrowser() {
  const browser = await puppeteer.launch(constants.BROWSER_OPTIONS);
  return browser;
}

/**
 * A function to create and navigate in the browser
 * @param {puppeteer.Browser} browserObject A browser object to create the page
 * @param {string} url The url to navigate to
 * @returns {puppeteer.Page} An instance of the page object navigated to the url
 * @async
 */
async function createPageAndNavigate(
  browserObject,
  url = constants.SITE_TO_SCRAPE
) {
  const page = await browserObject.newPage();
  await page.goto(url);
  return page;
}

/**
 * Change the job listing to latest
 * @param {puppeteer.Page} page The document
 * @async
 */
async function changeToLatest(page) {
  await page.waitForTimeout(2000);
  await page.click(constants.DOWN_ARROW);
  await page.waitForSelector(constants.DATE_LI);
  await page.click(constants.DATE_LI);
  await page.click(constants.UP_ARROW);
  await page.waitForTimeout(2000);
}

/**
 * A function to take screenshot
 * @param {puppeteer.Page} page The page to take screenshot of
 * @param {Object} options The objects to pass for screenshot
 * @async
 */
async function doScreenshot(page, options = constants.SCREENSHOT_OPTIONS) {
  await page.screenshot(options);
}

/**
 * A function to do job search on Naukri.com
 * @param {puppeteer.Page} page The page to do search queries on
 * @param {String} jobTitle The title of the job to search for
 * @async
 */
async function doSearch(page, jobTitle) {
  try {
    let pageTitle = await page.title();
    if (pageTitle.includes("Recruitment")) {
      let searchInput = await page.$(constants.SEARCH_FIELD_SELECTOR);
      await searchInput.type(jobTitle);
      let searchButton = await page.$(constants.SEARCH_BUTTON_SELECTOR);
      await searchButton.click();
      await page.waitForTimeout(3000);
    } else {
      let modifySpan = await page.$("span.naukicon.naukicon-pencil");
      await modifySpan.click();
      await page.waitForTimeout(2000);
      let searchInput = await page.$(constants.SEARCH_FIELD_SELECTOR);
      if (isNull(searchInput) || searchInput == undefined) {
        searchInput = await page.$(constants.SEARCH_FIELD_SELECTOR);
      }
      await searchInput.click({ clickCount: 3 });
      await searchInput.type(jobTitle);
      let modifyButton = await page.$("button.btn-primary");
      await modifyButton.click();
      await page.waitForTimeout(3000);
    }
  } catch (e) {
    errorHandler(e);
  }
}

/**
 * A function to close a page
 * @async
 * @param {puppeteer.Page} page The page to close
 */
async function pageClose(page) {
  await page.close();
}

/**
 * A function to close the page and browser
 * @param {puppeteer.Browser} browser The browser to close
 * @async
 */
async function browserClose(browser) {
  await browser.close();
}

/**
 * A function to close page and browser at the same time
 * @param {puppeteer.Page} page The page to be closed
 * @param {puppeteer.Browser} browser The browser to be closed
 * @async
 */
async function pageAndBrowswerClose(page, browser) {
  await pageClose(page);
  await browserClose(browser);
}

/**
 * A function to select job listings
 * @param {puppeteer.Page} page The webpage to manipulate
 * @param {boolean} single indicates whether a single or multiple job listing must be selected
 * @returns {puppeteer.ElementHandle[]} An array of element handles
 * @async
 */
async function selectJobListings(page, single = false) {
  if (single) {
    let elementHandles = await page.$(constants.JOB_SELECTOR);
    elementHandles = [elementHandles];
    return elementHandles;
  }
  let elementHandles = await page.$$(constants.JOB_SELECTOR);
  return elementHandles;
}

/**
 * A function to extract job card
 * @param {puppeteer.ElementHandle} jobListing The job card to extract link
 * @param {string} property The property to extract
 * @return {string} The value of the property
 * @async
 */
async function getNodeProperty(jobListing) {
  if (isNull(jobListing)) {
    print("Job Listing is null");
    process.exit(0);
  }
  try {
    let jobLink = await jobListing.$("div>div>a");
    jobLink = await jobLink.getProperty("href");
    jobLink = await jobLink._remoteObject.value;
    return jobLink;
  } catch (e) {
    errorHandler(e);
  }
}

/**
 * A function to extract the links of jobs
 * @param {puppeteer.ElementHandle[]} handleArray The array containing the handles
 * @returns {string[]} The links of the job postings
 * @async
 */
async function extractJobLinksAsStrings(handleArray) {
  let returnArray = [];
  try {
    for (let i = 0; i < handleArray.length; i++) {
      let actualValue = await getNodeProperty(handleArray[i]);
      returnArray.push(actualValue);
    }
  } catch (e) {
    errorHandler(e);
  }
  return returnArray;
}

/**
 * A function to log the titles of each links
 * @param {string[]} elementHandle The links of each page
 * @returns {string[]} The names of the titles
 * @async
 */
async function logPageTitle(elementHandle, browser) {
  let titles = [];
  for (let i = 0; i < elementHandle.length; i++) {
    let page = await createPageAndNavigate(browser, elementHandle[i]);
    let title = await page.title();
    titles.push(title);
    await pageClose(page);
  }
  return titles;
}

/**
 * A function to get innerText of an element
 * @param {puppeteer.Page} page The page to select the prop
 * @param {string} selector The selector of the element
 * @returns {string} the value of the innerText in the "selector"
 * @async
 */
async function getInnerText(page, selector) {
  let prop = await page.$(selector);
  if (!isNull(prop)) {
    prop = await prop.getProperty("innerText");
    prop = await prop._remoteObject.value;
    return prop;
  } else {
    prop = "NA";
    return prop;
  }
}

/**
 * A function to extract chips on a webpage
 * @param {puppeteer.Page} page The page to select the chips from
 * @param {string} selector The selector for the chips
 * @returns {string[]}
 * @throws {Error}
 * @async
 */
async function getChips(page, selector) {
  if (selector == null || selector == undefined)
    throw new Error("No Selector for Chip");
  let chips = [];
  let selectors = await page.$$(selector);
  for (let i = 0; i < selectors.length; i++) {
    let string = await selectors[i].getProperty("innerText");
    string = await string._remoteObject.value;
    chips.push(string);
  }
  return chips;
}

/**
 * A function to extract the job details
 * @param {puppeteer.Browser} browser The browser to use while navigating
 * @param {string} url The url of the job
 * @param {object[]} arrayToPushInto The array which contains the JSON
 * @throws {Error} Throws an Error if the "url" is null
 * @async
 */
async function extractJobDetails(browser, url, arrayToPushInto) {
  if (isNull(url) || url == undefined)
    throw new Error("No URL for extractJobDetails");
  const page = await createPageAndNavigate(browser, url);
  await page.waitForTimeout(1000);
  try {
    // Job Title
    let title = await getInnerText(page, constants.TITLE);
    // Company
    let companyName = await getInnerText(page, constants.COMPANY_NAME);
    // Rating
    let companyRating = await getInnerText(page, constants.RATING_SELECTOR);
    // Experience
    let experience = await getInnerText(page, constants.EXPERIENCE_SELECTOR);
    // Salary
    let salary = await getInnerText(page, constants.SALARY_SELECTOR);
    // Location
    let location = await getInnerText(page, constants.LOCATION_SELECTOR);
    // Openings and Applications
    let openings = await getInnerText(page, constants.OPENINGS_SELECTOR);
    let applicants = await getInnerText(page, constants.APPLICANTS_SELECTOR);
    // Role and Industry and other details
    let role = await getInnerText(page, constants.ROLE_SELECTOR);
    let industry = await getInnerText(page, constants.INDUSTRY_SELECTOR);
    let functionalArea = await getInnerText(
      page,
      constants.FUNCTIONAL_AREA_SELECTOR
    );
    let employmentType = await getInnerText(
      page,
      constants.EMPLOYMENT_TYPE_SELECTOR
    );
    let roleCategory = await getInnerText(page, constants.ROLE_CAT_SELECTOR);
    // Fill the Object
    let companyWebsite = await getInnerText(page, constants.WEBSITE_SELECTOR);
    let companyAddress = await getInnerText(page, constants.ADDRESS_SELECTOR);
    let keySkills = await getChips(page, constants.CHIP_SELECTOR);
    let qualification = await getChips(page, constants.QUALIFICATION_SELECTOR);
    let objectToPush = {
      title,
      companyName,
      companyRating,
      experience,
      salary,
      location,
      openings,
      applicants,
      role,
      industry,
      functionalArea,
      employmentType,
      roleCategory,
      companyWebsite,
      companyAddress,
      keySkills,
      qualification,
      url,
    };
    // Push the object
    arrayToPushInto.push(objectToPush);
    // Finally close the page
    await pageClose(page);
  } catch (e) {
    console.error("Some Error Occured by extractJobDetails😈📑");
    errorHandler(e);
    throw new Error("Outside Error ⚡⚡⚡");
  }
}

/**
 * A function to extract all job titles in one go
 * @param {puppeteer.Browser} browser The browser to continue scraping on
 * @param {string[]} urls The urls of each job
 * @returns {object[]} The data for all the jobs
 * @throws {Error}
 * @async
 */
async function extractAllJobsDetails(browser, urls) {
  if (urls.length <= 0 || urls == undefined || urls == null)
    throw new Error("Empty URL.0️⃣");
  let data = [];
  for (let i = 0; i < urls.length; i++) {
    await extractJobDetails(browser, urls[i], data);
  }
  return data;
}

/**
 * A function to encapsulate the entire working
 * @param {puppeteer.Browser} browser The browser to use for scraping
 * @param {puppeteer.Page} page The page to start scrape
 * @param {string[]} jobs The list of jobs to scrape
 * @return {object[]} the list of all jobs and their data
 * @throws {Error}
 * @async
 */
async function extractAllInOneGo(browser, page, jobs = constants.DEFAULT_JOBS) {
  try {
    if (isNull(jobs) || jobs == undefined) throw new Error("No jobs to scrape");
    if (isNull(page) || page == undefined) throw new Error("No page to scrape");
    let returnArray = [];
    for (let i = 0; i < jobs.length; i++) {
      await doSearch(page, jobs[i]);
      let handles = await selectJobListings(page).then(
        extractJobLinksAsStrings
      );
      let extractedJsonArray = await extractAllJobsDetails(browser, handles);
      returnArray.push(...extractedJsonArray);
      console.log(`Pushed ${i + 1} job(s) to the queue`);
    }
    return returnArray;
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}

exports.changeToLatest = changeToLatest;
exports.createBrowser = createBrowser;
exports.createPageAndNavigate = createPageAndNavigate;
exports.doScreenshot = doScreenshot;
exports.doSearch = doSearch;
exports.pageClose = pageClose;
exports.browserClose = browserClose;
exports.pageAndBrowswerClose = pageAndBrowswerClose;
exports.selectJobListings = selectJobListings;
exports.getNodeProperty = getNodeProperty;
exports.extractJobLinksAsStrings = extractJobLinksAsStrings;
exports.logPageTitle = logPageTitle;
exports.extractJobDetails = extractJobDetails;
exports.extractAllJobsDetails = extractAllJobsDetails;
exports.extractAllInOneGo = extractAllInOneGo;
