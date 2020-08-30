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
    
    let chart = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 42 42" class="donut">
<circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
<circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="3"></circle>
`;

    str = JSON.parse(str);

    let rawdata = fs.readFileSync("data/colors.json");
    let parsed = JSON.parse(rawdata);
    console.log(parsed);

    allLength = 0;
    color = "";
    usedColors = [];
    usedLanguages = [];
    for (i = 0; i < str.data.languages.length; i++) {
      console.log(str.data.languages[i]);
      console.log(i);

      try {
        color = parsed[str.data.languages[i].name].color;
      } catch {
        color = "#000";
      }

      usedColors.push(color);
      usedLanguages.push(str.data.languages[i].name);

      chart += `    <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="${color}" stroke-width="3" stroke-dasharray="${
        str.data.languages[i].percent
      } ${100 - str.data.languages[i].percent}" stroke-dashoffset="${
        100 - allLength + 25
      }"></circle>
      `;
      allLength += str.data.languages[i].percent;
    }

    chart += `</svg>`;

    fs.writeFile("./build/build.svg", chart, function (err) {
      if (err) return console.log(err);
      console.log("Wrote to ./build/");
    });

    let colorNames = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 10 10">`;

    for (i = 0; i < usedLanguages.length; i++) {
      colorNames += `
        <rect width="1" height="1" style="fill:${usedColors[i]};" y="${
        i + 0.1
      }" />
        <text font-size="1" x="1.2" y="${i + 1}">${usedLanguages[i]}</text>
      `;
    }

    colorNames += `</svg>`;

    fs.writeFile("./build/build.names.svg", colorNames, function (err) {
      if (err) return console.log(err);
      console.log("Wrote to ./build/ for names");
    });

    console.log(usedColors);
    console.log(usedLanguages);
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
