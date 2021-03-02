// create a test data set of valid users
require("dotenv").config();
require("./../../config/mongo"); // fetch the db connection
const ArtistModel = require("./../../model/Artist"); // fetch the model to validate our user document before insertion (in database)

const artists = [
  {
    name: "sonic youth",
    description: "a noisy band",
    isBand: true,
    picture:
      "https://res.cloudinary.com/gdaconcept/image/upload/v1614550774/workshop-artistify/sonic-youth_xhidd0.jpg",
  },
  {
    name: "wu tang clan",
    description: "a legendary hip hop crew",
    isBand: true,
    picture:
      "https://res.cloudinary.com/gdaconcept/image/upload/v1614550771/workshop-artistify/wu-tang-logo_rv3uk3.jpg",
  },
  {
    name: "aphex twin",
    description: "a major electro artist",
    isBand: false,
    picture:
      "https://res.cloudinary.com/gdaconcept/image/upload/v1614551075/workshop-artistify/aphex-twin_nqrksh.jpg",
  },
  {
    name: "bojan z",
    description: "a dope jazz artist",
    isBand: false,
    picture:
      "https://res.cloudinary.com/gdaconcept/image/upload/v1614551075/workshop-artistify/bojan-z_ffqeqx.jpg",
  },
  {
    name: "bad brains",
    description: "a mythical punk band",
    isBand: true,
    picture:
      "https://res.cloudinary.com/gdaconcept/image/upload/v1614551075/workshop-artistify/bad-brains_ykblym.jpg",
  },
];

(async function insertLabels() {
  try {
    await ArtistModel.deleteMany(); // empty the styles db collection
    const inserted = await ArtistModel.insertMany(artists); // insert docs in db
    console.log(`seed artists done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
})();
