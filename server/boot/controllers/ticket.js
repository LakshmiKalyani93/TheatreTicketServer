module.exports = function (app) {
  const { Ticket } = app.models;
  const moment = require("moment");
  const _ = require("underscore");
  const R = require("ramda");
  const async = require("async");
  const analyticsMethods = ["DBaggregation", "JSaggregation"];
  const MongoClient = require("mongodb").MongoClient;
  const url = "mongodb://127.0.0.1:27017";
  const dbName = "ticketserverdb";

  const getMonthYearBetweenDates = (stDate, endDt) => {
    const startDate = moment(stDate);
    const endDate = moment(endDt);
    const timeValues = [];
    while (
      endDate > startDate ||
      startDate.format("M") === endDate.format("M")
    ) {
      timeValues.push(startDate.format("MMMM YYYY"));
      startDate.add(1, "month");
    }
    return timeValues;
  };

  const DBAnalytics = async (stDate, endDate) => {
    try {
      const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      if (client && client.isConnected) {
        const db = client.db(dbName);
        return await db
          .collection("Ticket")
          .find({
            creationDate: {
              $gte: new Date(stDate),
              $lte: new Date(endDate),
            },
          })
          .toArray();
      }
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      throw error;
    }
  };

  const JSAnalytics = async (startOfMonth, endOfMonth) => {
    try {
      const query = {
        where: {
          creationDate: {
            between: [new Date(startOfMonth), new Date(endOfMonth)],
          },
        },
      };
      return await Ticket.find(query);
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      throw error;
    }
  };

  const getAnalytics = (method, stDate, endDate, analyticType) =>
    new Promise((resolve, reject) => {
      try {
        const resArr = [];
        const monthYearArr = getMonthYearBetweenDates(stDate, endDate);
        return async.eachSeries(
          monthYearArr,
          async (item) => {
            let resItems = [];
            const startOfMonth = moment(item, "MMMM YYYY")
              .clone()
              .startOf("month")
              .format("YYYY-MM-DD hh:mm");
            const endOfMonth = moment(item, "MMMM YYYY")
              .clone()
              .endOf("month")
              .format("YYYY-MM-DD hh:mm");

            if (method === "DBaggregation") {
              resItems = await DBAnalytics(startOfMonth, endOfMonth);
            } else {
              resItems = await JSAnalytics(startOfMonth, endOfMonth);
            }
            const arrItem = { month: item };

            if (analyticType === "VISITED") {
              arrItem.summaryVisit = resItems.length;
            } else {
              const totalPrice = R.reduceBy(
                (acc, next) => acc + next.ticketPrice,
                0,
                (x) => "summaryProfit",
                resItems
              );
              arrItem.summaryProfit = totalPrice.summaryProfit
                ? totalPrice.summaryProfit
                : 0;
            }

            resArr.push(arrItem);
          },
          (err) => {
            if (!err && resArr.length) {
              return resolve(resArr);
            }
            return reject(err);
          }
        );
      } catch (error) {
        error.statusCode = error.statusCode || 400;
        throw error;
      }
    });

  Ticket.getEarnedAnalytics = async (method, stDate, endDate) => {
    try {
      const err = new Error();
      if (method && R.contains(method, analyticsMethods)) {
        return await getAnalytics(method, stDate, endDate, "EARNED");
      }
      err.statusCode = 400;
      err.message = "invalid method request";
      throw err;
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      throw error;
    }
  };

  Ticket.getVisitedAnalytics = async (method, stDate, endDate) => {
    try {
      const err = new Error();
      if (method && R.contains(method, analyticsMethods)) {
        return await getAnalytics(method, stDate, endDate, "VISITED");
      }
      err.statusCode = 400;
      err.message = "invalid method request";
      throw err;
    } catch (error) {
      error.statusCode = error.statusCode || 400;
      throw error;
    }
  };
};
