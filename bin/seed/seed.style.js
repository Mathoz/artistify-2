// create a test data set of valid users
require("dotenv").config();
require("./../../config/mongo"); // fetch the db connection
const StyleModel = require("./../../model/Style"); // fetch the model to validate our user document before insertion (in database)

const styles = [
  {
    name: "jazz",
    color: "gray",
    wikiURL: "https://en.wikipedia.org/wiki/Jazz",
  },
  {
    name: "rock",
    color: "black",
    wikiURL: "https://en.wikipedia.org/wiki/Rock_music",
  },
  {
    name: "rap",
    color: "firebrick",
    wikiURL: "https://en.wikipedia.org/wiki/Hip_hop_music",
  },
  {
    name: "punk rock",
    color: "pink",
    wikiURL: "https://en.wikipedia.org/wiki/Punk_rock",
  },
  {
    name: "classical",
    color: "orange",
    wikiURL: "https://en.wikipedia.org/wiki/Classical_music",
  },
  {
    name: "folk",
    color: "green",
    wikiURL: "https://en.wikipedia.org/wiki/Folk_music",
  },
  {
    name: "blues",
    color: "blue",
    wikiURL: "https://en.wikipedia.org/wiki/Blues_(disambiguation)",
  },
];

(async function insertTestStyles() {
  try {
    await StyleModel.deleteMany(); // empty the styles db collection
    const inserted = await StyleModel.insertMany(styles); // insert docs in db
    console.log(`seed styles done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
})();
