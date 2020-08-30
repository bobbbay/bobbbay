# `Wakatime-api`

This module recieves statistics through an asynchronous `GET` request to wakatime's public API. It then writes this information in the form of an `SVG` file (`build.svg`), located in the [`build/`](build/) directory. The information is written as a Pie Chart, purely written in `SVG`, so the file can be treated as an image externally. Information is also written as text and boxes to another file in the build directory, `build.names.svg`. This allows understandability of which color represents which language in the chart, and is essentially a `legend`.

### `index.js`

The main file, that is run. It sends the `GET` request, writes to files, and is around 100 lines of code.

### `package.json`, `package-lock.json`

The regular `NPM` init files.

### `build/`

The directory that stores the built images. `index.js` writes information directly here.

### `data/`

Containing just a JSON file that holds `language: "color"`. This is what allows the chart(s) to have correspinding language-colors.
