const express = require('express');
const router = express.Router();
const db = require('../models');
const cloudinary = require('cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name: 'ved13',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
var storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// Get user by User Id
router.get('/profile/:id/:name', (req, res, next) => {
    db.User.findById(req.params.id, '-password').populate('applications', 'title duration _id description category recruited').populate('certificates').populate('experiences').populate('projects').populate('achievements').populate({ path: "internshipsOffered", select: 'title duration _id category  description applicants', populate: { path: 'applicants', select: 'name email photo' } }).populate({ path: "internshipsOffered", populate: { path: 'recruited', select: 'name email photo' } }).exec()
        .then((user) => {
            if (user) {
                res.status(200).send(user);
            } else {
                next({
                    status: 404,
                    message: 'User Not Found'
                })
            }
        }).catch((err) => {
            next(err);
        });
});


// Profile Search Suggestions
router.get('/profile/search', (req, res, next) => {
    let regex = new RegExp(escapeRegex(req.query.name), 'gi')
    db.User.find({ fname: regex }, '_id lname fname photo')
        .then((users) => {
            users.forEach(user => {
                // Object.assign(user, { "text": `${user['fname']} ${user['lname']}` });
                // user['fname'] = user['text']
            });
            res.send(users);
            // res.status(200).send(users)
        }).catch((err) => {
            next({
                status: 404,
                message: 'User Not Found'
            })
        });
});

// Profile Updates
router.put('/profile/update/picture', upload.single('file'), (req, res, next) => {
    console.log(req.body);
    db.User.findById(req.body.id)
        .then(async (user) => {
            try {
                await cloudinary.v2.uploader.destroy(user.photoId);
                var result = await cloudinary.v2.uploader.upload(req.file.path);
                user.photoId = result.public_id;
                user.photo = result.secure_url;
                await user.save();
                return res.send({ photo: result.secure_url, photoId: result.public_id });

            } catch (err) {
                next(err);
            }
        })
        .catch(err => next(err))
});

// skills
router.put('/profile/update/skills', (req, res, next) => {
    db.User.findByIdAndUpdate(req.body.id, { skills: req.body.skills })
        .then(async (user) => {
            res.send('Updated!');
        }).catch((err) => {
            next(err);
        });
});

// basic info
router.put('/profile/update/basicinfo', (req, res, next) => {
    db.User.findByIdAndUpdate(req.body.id, req.body.user)
        .then(async (user) => {
            res.send('Updated!');
        }).catch((err) => {
            next(err);
        });
});

// experience
router.put('/profile/update/experiences', (req, res, next) => {
    db.User.findById(req.body.id)
        .then(async user => {
            if (!user) {
                return next({ status: 404, message: "User Not Found" });
            }
            try {
                let experience = await db.Experience.create(req.body.experience)
                await user.experiences.push(experience);
                await user.save();
                res.send(experience);
            } catch (error) {
                next(error);
            }
        }).catch((err) => {
            next(err);
        });
});





module.exports = router;
