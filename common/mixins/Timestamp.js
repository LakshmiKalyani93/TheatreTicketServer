module.exports = (Model) => {
  // Model is the model class
  // options is an object containing the config properties from model definition
  Model.defineProperty("created", {
    type: "date",
  });
  Model.defineProperty("lastUpdated", {
    type: "date",
  });
  // before Save
  Model.observe("before save", (ctx, next) => {
    if (ctx.isNewInstance) {
      ctx.instance.created = new Date();
      ctx.instance.lastUpdated = new Date();
    } else if (ctx.data) {
      ctx.data.lastUpdated = new Date();
    } else if (ctx.options && ctx.options.validate) {
      ctx.instance.lastUpdated = new Date();
    } else if (
      typeof ctx.currentInstance === "undefined" &&
      typeof ctx.data === "undefined"
    ) {
      ctx.instance.created = new Date();
      ctx.instance.lastUpdated = new Date();
    }
    next();
  });
};
