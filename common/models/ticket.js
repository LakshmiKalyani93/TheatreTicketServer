"use strict";

module.exports = function (Ticket) {
  //..
  Ticket.remoteMethod("getEarnedAnalytics", {
    description: "Get earned analytics",
    accepts: [
      {
        arg: "method",
        type: "string",
        http: { source: "query" },
        required: true,
      },
      {
        arg: "startDate",
        type: "string",
        http: { source: "query" },
        required: true,
      },
      {
        arg: "endDate",
        type: "string",
        http: { source: "query" },
        required: true,
      },
    ],
    returns: {
      type: "object",
      root: true,
    },
    http: {
      path: "/analytics/earned",
      verb: "get",
      status: 200,
      errorStatus: 400,
    },
  });

  Ticket.remoteMethod("getVisitedAnalytics", {
    description: "Get visited analytics",
    accepts: [
      {
        arg: "method",
        type: "string",
        http: { source: "query" },
        required: true,
      },
      {
        arg: "startDate",
        type: "string",
        http: { source: "query" },
        required: true,
      },
      {
        arg: "endDate",
        type: "string",
        http: { source: "query" },
        required: true,
      },
    ],
    returns: {
      type: "object",
      root: true,
    },
    http: {
      path: "/analytics/visited",
      verb: "get",
      status: 200,
      errorStatus: 400,
    },
  });
};
