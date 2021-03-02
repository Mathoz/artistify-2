const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema(
    {
        title: String,
        releaseDate: Date,
        label: {type: Schema.Types.ObjectId, ref:"label"},
        artist: {type: Schema.Types.ObjectId, ref:"artist"},
        cover: {
            type: String,
            default: "https://res.cloudinary.com/gdaconcept/image/upload/v1614550771/workshop-artistify/no-image-logo_dcufai.png"
        }
    }
);

const AlbumModel = mongoose.model("album", albumSchema);

module.exports = AlbumModel;
