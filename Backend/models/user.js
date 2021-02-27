const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userScehma = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailToken: String,
    name: String,
    dept: String,
    role: String,
    year: String,
    facultyId: String,
    photo: {
        type: String,
        default: 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg'
    },
    photoId: {
        type: String,
        default: '123z99'
    },
    created: {
        type: Date,
        default: Date.now
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship'
        }
    ],
    internshipsOffered: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship'
        }
    ],
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship'
        }
    ],

    skills: [
        {
            type: String
        }
    ],
    certificates: [
        {
            link: String,
            title: String,
            date: {
                type: Date
            },
            provider: String,
            logo: String
        }
    ],
    achievements: [
        {
            title: String,
            reward: String,
            date: {
                type: Date,
            },
            description: String,
            link: String,
        }
    ],
    experiences: [
        {
            title: String,
            type: String,
            company: String,
            startdate: {
                type: Date,
            },
            enddate: {
                type: Date,
            },
            description: String,
        }
    ],
    projects: [
        {
            title: String,
            startdate: {
                type: Date,
            },
            enddate: {
                type: Date,
            },
            description: String,
            link: String,
        }
    ],
    bio: String,
    socialHandles: {
        facebook: {
            type: String,
            default: ''
        },
        twitter: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        github: {
            type: String,
            default: ''
        },
        likes: Number
    }


});

userScehma.methods.comparePassword = async function (password, next) {
    try {
        let isMatch = await bcrypt.compare(password, this.password);
        return isMatch;

    } catch (err) {
        return next(err);
    }
}

userScehma.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        let hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        return next();

    } catch (err) {
        next(err);
    }
});
const User = mongoose.model('User', userScehma);
module.exports = User;