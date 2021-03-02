const express = require("express");
const router = new express.Router();
const AlbumModel = require("./../model/Album");
const ArtistModel = require("./../model/Artist");
const LabelModel = require("./../model/Label");
const uploader = require("./../config/cloudinary");

// router.use(protectAdminRoute);

// GET - all albums
router.get("/", async (req, res, next) => {
  try {
    res.render("dashboard/albums", {
      albums: await AlbumModel.find().populate("artist label"),
    });
  } catch (err) {
    next(err);
  }
});


// GET - create one album (form)
router.get("/create", async (req, res, next) => {
  const artists = await ArtistModel.find();
  const labels = await LabelModel.find();
  res.render("dashboard/albumCreate", { artists, labels });
});

// POST - create one album
router.post("/create", uploader.single("cover"), async (req, res, next) => {
  const newAlbum = { ...req.body };
  if (!req.file) newAlbum.cover = undefined;
  else newAlbum.cover = req.file.path;
  console.log(newAlbum, 'CREATE POST');
  try {
    await AlbumModel.create(newAlbum);
    res.redirect("/dashboard/album");
  } catch (err) {
    next(err);
  }
});

// GET - update one album (form)
router.get("/update/:id", async (req, res, next) => {
  try{
    const artists = await ArtistModel.find();
    const labels = await LabelModel.find();
    const album = await AlbumModel.findById(req.params.id).populate("artist label");
    res.render('./dashboard/albumUpdate', {album, artists, labels});
  } catch(err) {next(err)};
})

// POST - update one album
router.post("/update/:id", (req, res, next) => {
  console.log(req.body);
  res.send('work in progress update')
})

// GET - delete one album
router.get("/delete/:id", (req, res, next) => {
  AlbumModel.findByIdAndDelete(req.params.id)
  .then(dbSuccess => {res.redirect("/dashboard/album");})
  .catch(next);
})

module.exports = router;
