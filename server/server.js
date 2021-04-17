// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

"use strict";

const loopback = require("loopback");
const boot = require("loopback-boot");

const app = loopback();
module.exports = app;

app.logger = require("./boot/lib/logging/logger");

app.logger.init(app);

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit("started");
    const baseUrl = app.get("url").replace(/\/$/, "");
    app.logger.info({
      message: `Web server listening at: ${baseUrl}`,
    });
    if (app.get("loopback-component-explorer")) {
      const explorerPath = app.get("loopback-component-explorer").mountPath;
      app.logger.info({
        message: `Browse your REST API at: ${baseUrl}${explorerPath}`,
      });
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(
  app,
  {
    appRootDir: __dirname,
    bootDirs: [`${__dirname}/boot`, `${__dirname}/boot/controllers`],
    bootScripts: [],
  },
  (err) => {
    if (err) {
      throw err;
    }
    // start the server if `$ node server.js`
    if (require.main === module) {
      app.start();
    }
  }
);
