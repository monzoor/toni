"use strict";
module.exports = function mountHandlers(app) {
  app.use("/", require("../routes/auth"));
};
