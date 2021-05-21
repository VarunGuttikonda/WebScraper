// Executable Path
const CHROME_PATH =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
// Viewport to be scraped
const VIEWPORT_OPTIONS = {
  width: 1536,
  height: 754,
  isLandscape: true,
};
// Browser Options
const notHeadless = false,
  isHeadless = true;
const BROWSER_OPTIONS = {
  headless: isHeadless,
  defaultViewport: VIEWPORT_OPTIONS,
};
// Site to be scraped
const SITE_TO_SCRAPE = "https://www.naukri.com/";
//Records for each job
const DEFAULT_RECORDS_TO_SCRAPE = 20;
// Jobs to scrape
const DEFAULT_JOBS = ["software engineer", "data analyst", "test engineer"];

const SCREENSHOT_OPTIONS = { path: "./screenshot.jpg", fullPage: false };
// Home Page
const SEARCH_FIELD_SELECTOR = "input.sugInp#qsb-keyword-sugg";
const SEARCH_BUTTON_SELECTOR = "button.btn";
const DOWN_ARROW =
  "#root > div.search-result-container > div.content > section.listContainer.fleft > div.sortAndH1Cont > div > span.sort-droop > p > i";
const UP_ARROW =
  "#root > div.search-result-container > div.content > section.listContainer.fleft > div.sortAndH1Cont > div > span.sort-droop > p > i";
const DATE_LI =
  "#root > div.search-result-container > div.content > section.listContainer.fleft > div.sortAndH1Cont > div > span.sort-droop > ul > li:nth-child(2)";
// Search Results Selectors
const JOB_SELECTOR = "article.jobTuple.bgWhite";
const LINK_SELECTOR = "./div[1]/div[1]/a";
// Job Page Selectors
const TITLE = "h1.jd-header-title";
const COMPANY_NAME = "div.jd-header-comp-name>a.pad-rt-8"; //Has 2 results
const RATING_SELECTOR = "span.amb-rating.pad-rt-4"; // Has many results
const EXPERIENCE_SELECTOR = "div.exp>span";
const SALARY_SELECTOR = "div.salary>span";
const LOCATION_SELECTOR = "div.loc>span.location>a";
const OPENINGS_SELECTOR = "div.bottom>div.jd-stats span:nth-child(2)>span";
const APPLICANTS_SELECTOR = "div.bottom>div.jd-stats span:nth-child(3)>span";
const ROLE_SELECTOR = "div.other-details>div.details:nth-child(1)>span>a";
const INDUSTRY_SELECTOR = "div.other-details>div.details:nth-child(2)>span>a";
const FUNCTIONAL_AREA_SELECTOR =
  "div.other-details>div.details:nth-child(3)>span>a";
const EMPLOYMENT_TYPE_SELECTOR =
  "div.other-details>div.details:nth-child(4)>span>span";
const ROLE_CAT_SELECTOR =
  "div.other-details>div.details:nth-child(5)>span>span";
const WEBSITE_SELECTOR = "section.about-company>div.comp-info-detail>span>a";
const ADDRESS_SELECTOR = "section.about-company>div.comp-info-detail>span";
const CHIP_SELECTOR = "a.chip.clickable>span";
const QUALIFICATION_SELECTOR =
  "section.job-desc>div.education>div.details>span";

exports.CHROME_PATH = CHROME_PATH;
exports.VIEWPORT_OPTIONS = VIEWPORT_OPTIONS;
exports.BROWSER_OPTIONS = BROWSER_OPTIONS;
exports.SITE_TO_SCRAPE = SITE_TO_SCRAPE;
exports.DEFAULT_RECORDS_TO_SCRAPE = DEFAULT_RECORDS_TO_SCRAPE;
exports.DEFAULT_JOBS = DEFAULT_JOBS;
exports.SCREENSHOT_OPTIONS = SCREENSHOT_OPTIONS;
exports.SEARCH_FIELD_SELECTOR = SEARCH_FIELD_SELECTOR;
exports.SEARCH_BUTTON_SELECTOR = SEARCH_BUTTON_SELECTOR;
exports.DOWN_ARROW = DOWN_ARROW;
exports.UP_ARROW = UP_ARROW;
exports.DATE_LI = DATE_LI;
exports.JOB_SELECTOR = JOB_SELECTOR;
exports.LINK_SELECTOR = LINK_SELECTOR;
exports.TITLE = TITLE;
exports.COMPANY_NAME = COMPANY_NAME;
exports.RATING_SELECTOR = RATING_SELECTOR;
exports.EXPERIENCE_SELECTOR = EXPERIENCE_SELECTOR;
exports.SALARY_SELECTOR = SALARY_SELECTOR;
exports.LOCATION_SELECTOR = LOCATION_SELECTOR;
exports.OPENINGS_SELECTOR = OPENINGS_SELECTOR;
exports.APPLICANTS_SELECTOR = APPLICANTS_SELECTOR;
exports.ROLE_SELECTOR = ROLE_SELECTOR;
exports.INDUSTRY_SELECTOR = INDUSTRY_SELECTOR;
exports.FUNCTIONAL_AREA_SELECTOR = FUNCTIONAL_AREA_SELECTOR;
exports.EMPLOYMENT_TYPE_SELECTOR = EMPLOYMENT_TYPE_SELECTOR;
exports.ROLE_CAT_SELECTOR = ROLE_CAT_SELECTOR;
exports.WEBSITE_SELECTOR = WEBSITE_SELECTOR;
exports.ADDRESS_SELECTOR = ADDRESS_SELECTOR;
exports.CHIP_SELECTOR = CHIP_SELECTOR;
exports.QUALIFICATION_SELECTOR = QUALIFICATION_SELECTOR;
