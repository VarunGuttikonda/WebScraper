const scrape = require("./scrape");
const ObjectsToCsv = require("objects-to-csv");
module.exports = async function (context, req) {
  try {
    context.log("Scraping Started");
    let jsonArray = await scrape();
    const csv = await new ObjectsToCsv(jsonArray);
    let string_data = await csv.toString();
    context.bindings.storage = string_data;
    context.bindings.res = {
      body: JSON.stringify(jsonArray),
      statusCode: 200,
      headers: {
        "content-type": "application/json",
      },
    };
    context.log("Everything executed properly");
    context.done();
  } catch (e) {
    context.error(e.message);
    context.bindings.res = {
      body: `${e.message}\n${e.stack}`,
      headers: {
        "content-type": "text/plain",
      },
      statusCode: 500,
    };
    context.done();
  }
};
