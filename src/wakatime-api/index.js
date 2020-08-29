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
    /*const output = require("d3node-output");
    const d3 = require("d3-node")().d3;
    const d3nPie = require("d3node-piechart");

    const csvString = fs.readFileSync("data/data.csv").toString();
    const data = d3.csvParse(csvString);

    // create output files
    output("./build/build", d3nPie({ data: str }));*/

    let chart = `<svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
<circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
<circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="3"></circle>

`;

    str = JSON.parse(str);

    let rawdata = fs.readFileSync("data/colors.json");
    let parsed = JSON.parse(rawdata);
    console.log(parsed);

    allLength = 0;
    color = "";
    for (i = 0; i < str.data.languages.length; i++) {
      console.log(str.data.languages[i]);
      console.log(i);

      try {
        color = parsed[str.data.languages[i].name].color;
      } catch {
        color = "#000";
      }

      chart += `    <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="${color}" stroke-width="3" stroke-dasharray="${
        str.data.languages[i].percent
      } ${100 - str.data.languages[i].percent}" stroke-dashoffset="${
        100 - allLength + 25
      }"></circle>
      `;
      allLength += str.data.languages[i].percent;
    }

    chart += `</svg>`;

    fs.writeFile("build/build.svg", chart, function (err) {
      if (err) return console.log(err);
      console.log("Wrote to ./build/");
    });
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

/*let today = https
  .request(
    { host: "wakatime.com", path: "/api/v1/users/@bobbbay/stats/last_7_days" },
    callback
  )
  .end();
*/
