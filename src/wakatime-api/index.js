// Grab https
const https = require("https");

// Define a callback function that is constant throughout all requests
const callback = function (response) {
  var str = "";
  response.on("data", function (chunk) {
    str += chunk;
  });
  response.on("end", function () {
    return str;
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

console.log(today);

const fs = require("fs");
const output = require("d3node-output");
const d3 = require("d3-node")().d3;
const d3nPie = require("d3node-piechart");

const csvString = fs.readFileSync("data/data.csv").toString();
const data = d3.csvParse(csvString);

// create output files
output("./build/build", d3nPie({ data: data }));
