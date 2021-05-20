/**
 * A function to convert days to milliseconds
 * @param {number} days The number of days to convert
 * @returns The milliseconds in the specified number of days
 */
 function convertDaysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
  }
  
  /**
   * A function to find the date of job posting given the days ago it was posted
   * @param {number} daysAgo The number of days ago the job was posted
   * @returns {String} The actual date of job posting
   */
  function giveActualPostedDate(daysAgo) {
    return new Date(
      Date.now() - convertDaysToMilliseconds(daysAgo)
    ).toDateString();
  }
  
  /**
   * Globar error handler
   * @param {Error} e The error to handle
   */
  function errorHandler(e) {
    console.error(`Error💥💣:${e.message}`);
    print();
    console.error(e.name);
    print();
    console.error(e.stack);
    print();
    console.log(`Quitting now😢😢😢👋👋`);
  }
  
  /**
   * A function to seperate lines using "="
   * @param {any} statement The statement to log
   */
  function print(statement) {
    if (isNull(statement) || statement == undefined) {
      console.log("==========================================================");
      return;
    }
    console.log("==========================================================");
    switch (typeof statement) {
      case "function":
        console.log(statement());
        break;
      case "boolean":
      case "number":
      case "undefined":
      case "string":
        console.log(statement);
        break;
      case "bigint":
        console.log(statement.toString(2));
        break;
      case "object":
        if (statement.length == undefined) console.log(statement);
        else if (statement.length != undefined) {
          statement.forEach((element, index) => {
            console.log(`${index + 1}. ${element}`);
          });
        }
        break;
      default:
        console.log(statement);
    }
  }
  
  /**
   * A function to check nullity
   * @param {*} property The property or value to check nullity
   * @returns {boolean}
   */
  function isNull(property) {
    return property == null;
  }
  exports.convertDaysToMilliseconds = convertDaysToMilliseconds;
  exports.giveActualPostedDate = giveActualPostedDate;
  exports.errorHandler = errorHandler;
  exports.print = print;
  exports.isNull = isNull;
  