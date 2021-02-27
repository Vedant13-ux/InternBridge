const express = require('express');
const router = express.Router();
const db = require('../models');
const skillJSON = require('../data/skills.json');
const mailer = require('../handlers/mailer');

// Search Internships
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

router.get('/getAll', async (req, res, next) => {
    try {
        var recentDate = new Date();
        let internships = await db.Internship.find({ applyBy: { $gte: recentDate } }).populate({ path: 'faculty', select: 'name photo email _id' }).exec();
        res.send(internships);
    } catch (err) {
        next(err);
    }

});

router.get('/search/title/:query', async (req, res, next) => {
    try {
        var regex = new RegExp(escapeRegex(req.params.query), 'gi');
        let internships = await db.Internship.find({ title: regex, applyBy: { $gte: recentDate } }).populate('faculty').exec();
        res.status(200).send(internships);
    } catch (err) {
        next(err);
    }

});


router.post('/search/filter', async (req, res, next) => {
    console.log(req.body);
    try {
        var query = new RegExp(escapeRegex(req.body.query), 'gi');
        var { min, max, skills, type } = req.body;
        min = parseInt(min);
        max = parseInt(max);
        var recentDate = new Date();
        skills = skills.map(skill => {
            return new RegExp(escapeRegex(skill), 'gi');
        });

        try {
            if (type.length === 1) {
                if (skills.length == 0) {
                    let internships = await db.Internship.find({ applyBy: { $gte: recentDate }, duration: { $gte: min, $lte: max }, title: query, type: type[0] }).populate('faculty').exec();
                    return res.status(200).send(internships);
                } else {
                    let internships = await db.Internship.find({ applyBy: { $gte: recentDate }, duration: { $gte: min, $lte: max }, title: query, skillsRequired: { $all: skills }, type: type[0] }).populate('faculty').exec();
                    return res.status(200).send(internships);
                }
            } else {
                if (skills.length === 0) {
                    let internships = await db.Internship.find({ applyBy: { $gte: recentDate }, title: query, duration: { $gte: min, $lte: max } }).populate('faculty').exec();
                    return res.status(200).send(internships);
                } else {
                    let internships = await db.Internship.find({ applyBy: { $gte: recentDate }, title: query, skillsRequired: { $all: skills }, duration: { $gte: min, $lte: max } }).populate('faculty').exec();
                    return res.status(200).send(internships);
                }
            }
        } catch (err) {
            console.log(err);
            return next(err);
        }
    } catch (err) {
        console.log(err);
        next(err);
    }

});

router.get('/details/:id', (req, res, next) => {
    db.InternshipDetails.findById(req.params.id).populate('faculty', 'name email _id photo').populate('applicants', 'name  email _id photo')
        .exec((err, internship) => {
            if (!internship) {
                return res.status(404).send({});
            }
            if (err) {
                return next(err);
            }

            let curr = new Date();
            internship["canApply"] = new Date(internship.applyBy) - curr > 0
            console.log(internship.canApply)
            return res.status(200).send(internship)
        })
});

router.get('/search/skills', async (req, res, next) => {
    var skills = req.query.skills.split(',');
    skills = skills.map(skill => {
        return new RegExp(escapeRegex(skill), 'gi');
    })
    console.log(skills);
    try {
        let suggested = await db.Internship.find({ skillsRequired: { $all: skills } }).populate('faculty', 'name photo _id').exec();
        res.send(suggested.filter((m) => String(m._id) !== String(req.query.id)));

    } catch (error) {
        next(err)
    }

});
// Create Internship
router.post('/create/internship', async (req, res, next) => {
    console.log(req.body);
    req.body.duration = parseInt(req.body.duration);
    req.body.numberOpenings = parseInt(req.body.numberOpenings);
    let user = await db.User.findById(req.body.faculty);
    if (user) {
        db.Internship.create(req.body)
            .then(async (internship) => {
                await user.internshipsOffered.push(internship);
                await user.save();
                res.status(200).send(internship);
            }).catch((err) => {
                next(err);
            });
    } else {
        return next({
            status: 404,
            message: 'User Not Found'
        })
    }
});

module.exports = router