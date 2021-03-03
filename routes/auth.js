const express = require('express');
const router = express.Router();
const uploader = require('./../config/cloudinary');
const bcrypt = require('bcrypt');

const UserModel = require('./../model/User');

//GET HOME AUTH
router.get('/', (req, res, next) => {
    res.render('auth/home');
})

//GET SIGNIN
router.get('/signin', (req, res, next) => {
    res.render('auth/signin')
})

//POST SIGNIN
router.post('/signin', uploader.single("avatar"), async (req, res, next) => {
    const {email, password} = req.body;
    const foundUser = await UserModel.findOne({email : email});

    if(!foundUser) {
        req.flash('error', 'Invalid credentials');
        res.redirect("/dashboard/auth/signin");
    } else {
        const isSamePassword = bcrypt.compareSync(password, foundUser.password);

        if(!isSamePassword) {
            req.flash('error', 'Invalid credentials');
            res.redirect("/dashboard/auth/signin");
        } else {
            const userObject = foundUser.toObject();
            delete userObject.password;

            req.session.currentUser = userObject;

            req.flash("success", "Successfully logged in...");
            res.redirect("/dashboard/auth");
        }
    }
});

//GET SIGNUP
router.get('/signup', async (req, res, next) => {
    res.render('auth/signup')
})

//POST SIGNUP
router.post('/signup', async (req, res, next) => {
    try {
        const newUser = { ...req.body };
        const foundUser = await UserModel.findOne({email: newUser.email});

        if(foundUser) {
            req.flash('warning', 'Email already registered');
            res.redirect("/dashboard/auth/signup");            
        } else {
            const hashedPassword = bcrypt.hashSync(newUser.password, 10);
            newUser.password = hashedPassword;

            await UserModel.create(newUser);
            req.flash('success', 'You are registered!');
            res.redirect("/dashboard/auth/signin");
        }


    } catch(err) {
        next(err);
    }
});

//GET SIGNOUT
router.get('/signout', (req, res, next) => {
    req.session.destroy(function (err) {
        res.redirect("/dashboard/auth/signin");
      });
});

module.exports = router;