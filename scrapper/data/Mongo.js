const mongoose = require("mongoose");
const Logger = require("../utils/Logger");
const Model = mongoose.model(
  "hotel",
  new mongoose.Schema({}, { strict: false })
);

class Mongo {
  static async connectDB() {
    await mongoose.connect("mongodb://localhost/biuFinalProj", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  static async storeData(dataObject) {
    if (typeof dataObject === "object") {
      try {
        let key = Object.keys(dataObject)[0];
        const isExisted = await Model.findOne({ [key]: dataObject[key] });
        if (!isExisted) {
          const doc = await new Model(dataObject);
          const savedDoc = await doc.save();
          Logger.info(savedDoc);
        }
      } catch (error) {
        Logger.error(error);
      } finally {
        Logger.log(
          `finished store data! -- ${dataObject[Object.keys(dataObject)[0]]}`
        );
      }
    } else {
      Logger.error("invalid Params");
    }
  }
}
module.exports = { Mongo, Model };
