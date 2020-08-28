// Grab https
const https = require("https");

const { Parser } = require("json2csv");

// Define a callback function that is constant throughout all requests
const callback = function (response) {
  var str = "";
  response.on("data", function (chunk) {
    str += chunk;
  });
  response.on("end", function () {
    const fs = require("fs");

    console.log(str);
    /*
    var json = JSON.parse(str).items;
    console.log(json);
    var fields = Object.keys(json[0]);
    var replacer = function (key, value) {
      return value === null ? "" : value;
    };
    var csv = json.map(function (row) {
      return fields
        .map(function (fieldName) {
          return JSON.stringify(row[fieldName], replacer);
        })
        .join(",");
    });
    csv.unshift(fields.join(",")); // add header column
    csv = csv.join("\r\n");
    console.log(csv);

    fs.writeFile("data/data.csv", csv, function (err) {
      if (err) return console.log(err);
      console.log("JSON > CSV > data/data.csv");
    });
*/
    const output = require("d3node-output");
    const d3 = require("d3-node")().d3;
    const d3nPie = require("d3node-piechart");

    const csvString = fs.readFileSync("data/data.csv").toString();
    const data = d3.csvParse(csvString);

    // create output files
    output("./build/build", d3nPie({ data: str }));
  });
};

/* A default request setup looks like the following: 
https
  .request(
    { host: "wakatime.com", path: "/api/v1/users/@bobbbay/stats/last_7_days" },
    callback
  )
  .end();
*/

let last7Days = https
  .request(
    { host: "wakatime.com", path: "/api/v1/users/@bobbbay/stats/last_7_days" },
    callback
  )
  .end();

let today = https
  .request(
    { host: "wakatime.com", path: "/api/v1/users/@bobbbay/stats/last_7_days" },
    callback
  )
  .end();
