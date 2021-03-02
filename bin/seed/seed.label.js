// create a test data set of valid users
require("dotenv").config();
require("./../../config/mongo"); // fetch the db connection
const LabelModel = require("./../../model/Label"); // fetch the model to validate our user document before insertion (in database)

const styles = [
  {
    name: "Ninja Tunes",
    street: "fake street",
    streetNumber: 999,
    country: "uk",
    city: "london",
    zipcode: "00000",
  },
  {
    name: "Loud Records",
    street: "fake street",
    streetNumber: 1,
    country: "usa",
    city: "new york",
    zipcode: "00000",
  },
  {
    name: "Warp Records",
    street: "fake street",
    streetNumber: 23,
    country: "uk",
    city: "london",
    zipcode: "00000",
  },
  {
    name: "Fat Wreck Chords",
    street: "fake street",
    streetNumber: 13,
    country: "usa",
    city: "san francisco",
    zipcode: "00000",
  },
  {
    name: "Death row",
    street: "fake street",
    streetNumber: 1000,
    country: "usa",
    city: "los angeles",
    zipcode: "00000",
  },
  {
    name: "Côté Obscur",
    street: "fake street",
    streetNumber: 23,
    country: "france",
    city: "marseille",
    zipcode: "00000",
  },
  {
    name: "ROIR Records",
    street: "fake street",
    streetNumber: 42,
    country: "usa",
    city: "new york",
    zipcode: "00000",
  },
];

(async function insertLabels() {
  try {
    await LabelModel.deleteMany(); // empty the styles db collection
    const inserted = await LabelModel.insertMany(styles); // insert docs in db
    console.log(`seed labels done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
})();
