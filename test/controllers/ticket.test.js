const sinon = require("sinon");
const loopback = require("loopback");
const { expect, assert } = require("chai");

describe("Ticket APIs", () => {
  let appContext = loopback();
  appContext = {
    models: {
      Ticket: {
        find: sinon.stub(),
      },
    },
  };

  beforeAll(async () => {
    require("../../server/boot/controllers/ticket")(appContext);
  });
  afterAll(() => {
    appContext = null;
  });

  describe("Get Earned Money Analytics of the Theatre", () => {
    const fakeResponse = [
      {
        month: "March 2021",
        summaryProfit: 0,
      },
      {
        month: "April 2021",
        summaryProfit: 0,
      },
    ];
    beforeAll(() => {
      appContext.models.Ticket.find = () => Promise.resolve(fakeResponse);
    });

    it("should return the earned money analytics on successful request", async () => {
      appContext.models.Ticket.find = () => Promise.resolve(fakeResponse);
      const result = await appContext.models.Ticket.getEarnedAnalytics(
        "JSaggregation",
        "2021-03-04",
        "2021-04-16"
      );
      expect(result).to.not.be.null;
      expect(JSON.stringify(result)).to.equal(JSON.stringify(fakeResponse));
    });

    it("should give error an invalid method param is sent", async () => {
      const fakeError = {
        statusCode: 400,
        name: "Error",
        message: "invalid method request",
      };
      try {
        appContext.models.Ticket.find = () => Promise.reject(fakeError);
        await appContext.models.Ticket.getEarnedAnalytics(
          "XXXX",
          "2021-03-04",
          "2021-04-16"
        );
      } catch (err) {
        expect(err).to.not.be.null;
        expect(err.statusCode).to.equal(400);
        expect(JSON.stringify(err)).to.equal(
          JSON.stringify({ statusCode: 400, message: "invalid method request" })
        );
      }
    });

    it("should give unauthorized error when no authToken is sent in the request", async () => {
      const fakeError = {
        statusCode: 401,
        name: "Error",
        message: "unauthorized"
      };
      try {
        appContext.models.Ticket.find = () => Promise.reject(fakeError);
        await appContext.models.Ticket.getEarnedAnalytics(
          "JSaggregation",
          "2021-03-04",
          "2021-04-16"
        );
      } catch (err) {
        expect(err).to.not.be.null;
        expect(err.statusCode).to.equal(401);
        expect(JSON.stringify(err)).to.equal(
          JSON.stringify(fakeError)
        );
      }
    });
  });

  describe("Get Visited People Analytics of the Theatre", () => {
    const fakeResponse = [
      {
        month: "March 2021",
        summaryVisit: 3,
      },
      {
        month: "April 2021",
        summaryVisit: 3,
      },
    ];
    beforeAll(() => {
      appContext.models.Ticket.find = () => Promise.resolve(fakeResponse);
    });

    it("should return the visited people analytics on successful request", async () => {
      appContext.models.Ticket.find = () => Promise.resolve(fakeResponse);
      const result = await appContext.models.Ticket.getVisitedAnalytics(
        "DBaggregation",
        "2021-03-04",
        "2021-04-16"
      );
      expect(result).to.not.be.null;
      expect(JSON.stringify(result)).to.equal(JSON.stringify(fakeResponse));
    });

    it("should give error an invalid method param is sent", async () => {
      const fakeError = {
        statusCode: 400,
        name: "Error",
        message: "invalid method request",
      };
      appContext.models.Ticket.find = () => Promise.reject(fakeError);
      try {
        await appContext.models.Ticket.getVisitedAnalytics(
          "XXXX",
          "2021-03-04",
          "2021-04-16"
        );
      } catch (err) {
        expect(err).to.not.be.null;
        expect(err.statusCode).to.equal(400);
        expect(JSON.stringify(err)).to.equal(
          JSON.stringify({
            statusCode: 400,
            message: "invalid method request",
          })
        );
      }
    });

    it("should give unauthorized error when no authToken is sent in the request", async () => {
      const fakeError = {
        statusCode: 401,
        name: "Error",
        message: "unauthorized",
      };
      appContext.models.Ticket.find = () => Promise.reject(fakeError);
      try {
        await appContext.models.Ticket.getVisitedAnalytics(
          "DBaggregation",
          "2021-03-04",
          "2021-04-16"
        );
      } catch (err) {
        expect(err).to.not.be.null;
        expect(err.statusCode).to.equal(401);
        expect(JSON.stringify(err)).to.equal(
          JSON.stringify({
            statusCode: 401,
            message: "unauthorized",
          })
        );
      }
    });
  });
});
