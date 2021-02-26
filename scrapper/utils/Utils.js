const fetch = require("node-fetch");
const xl = require("excel4node");
const Logger = require("./Logger");
const fs = require("fs");
const { Model, Mongo } = require("../data/Mongo");

class Utils {
  static async getHTML(url) {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        return await response.text();
      } else {
        throw "Faild get html, Status code: " + response.status;
      }
    } catch (error) {
      Logger.error(error);
    }
  }
  static async saveJson(object) {
    try {
      return new Promise((resolve, reject) => {
        fs.writeFile("./data.json", JSON.stringify(object), "utf-8", (err) => {
          err ? reject("can not save json") : resolve();
        });
      });
    } catch (error) {
      Logger.error(error);
    }
  }
  static async saveExcel(object) {
    return new Promise((resolve, reject) => {
      try {
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet("hotels reviews");
        const headingColumnNames = ["name", "title", "desc", "user"];
        let headingColumnIndex = 1;
        headingColumnNames.forEach((heading) => {
          ws.cell(1, headingColumnIndex++).string(heading);
        });
        let rowIndex = 2;
        object.forEach((record) => {
          let columnIndex = 1;
          Object.keys(record).forEach((columnName) => {
            ws.cell(rowIndex, columnIndex++).string(record[columnName]);
          });
          rowIndex++;
        });
        wb.write("hotelReviews.csv");
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

//remainder!!!!
///
///
// BEFORE CONNECT TO MONGO MAKE SURE U CONNECT THE CORRECT ONE !!!!
//
//
// const updateDBForCategories = async () => {
//   index = 0;
//   try {
//     const CATEGORIES = [
//       "service",
//       "price",
//       "room",
//       "location",
//       "food",
//       "cleanliness",
//     ];
//     const json = require("./convertcsv.json");
//     const NEWJSON = [];
//     await Mongo.connectDB();
//     json.forEach((record) => {
//       CATEGORIES.includes(record["I"])
//         ? (record["I"] = record["I"])
//         : (record["I"] = "general");
//       CATEGORIES.includes(record["J"])
//         ? (record["J"] = record["J"])
//         : (record["J"] = "general");
//       CATEGORIES.includes(record["K"])
//         ? (record["K"] = record["K"])
//         : (record["K"] = "general");
//       CATEGORIES.includes(record["L"])
//         ? (record["L"] = record["L"])
//         : (record["L"] = "general");
//       CATEGORIES.includes(record["M"])
//         ? (record["M"] = record["M"])
//         : (record["M"] = "general");

//       NEWJSON.push({
//         D: record["D"],
//         G: record["G"],
//         categories: [
//           record["I"],
//           record["J"],
//           record["K"],
//           record["L"],
//           record["M"],
//         ],
//       });
//     });

//     for await (const record of NEWJSON) {
//       console.log(index++);
//       await Model.findOneAndUpdate(
//         { name: record["D"], "reviews.user": record["G"] },
//         { $set: { "reviews.$.categories": record.categories } }
//       );
//       //   await new Promise((res) => setTimeout(async () => res(), 200));
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log("done!!");
//   }
// };
// updateDBForCategories();
// updateReviewsPrediction()
// const saveReviewsExcel = async ()=>{
//     try {
//         let json = []
//         await Mongo.connectDB();
//         let results = await Model.find({},{_id:0,reviews:1,name:1});
//         results.forEach(res=>{
//             let result = res._doc;
//             result.reviews.forEach(review=>{
//                 json.push(Object.assign({name:result.name},{title:review.title,desc:review.desc,user:review.user}));
//             })
//         })
//         await Utils.saveExcel(json);
//     } catch (error) {
//         Logger.error(error)
//     }finally{
//         Logger.log('done')
//     }
// }
// saveReviewsExcel()
module.exports = Utils;
