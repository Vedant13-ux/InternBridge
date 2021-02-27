const db = require('./models/index');


async function seedDB() {

    data = {}
    // for (let i = 0; i < 3; i++) {
    data = {
        name: "Vedant Nagani",
        dept: "IT",
        year: "FY",
        password: "123",
        email: "vedantnagani@gmail.com"
    }
    // db.User.create(data)
    //     .then((result) => {
    //         console.log(result)
    //     }).catch((err) => {
    //         console.log(err)
    //     });
    // }
    for (let i = 0; i < 3; i++) {
        data = {
            faculty: "603a2117bf8c6c50f88e456d",
            title: 'Machine Learning',
            skillsRequired: ['Python', 'R', 'Pandas'],
            duration: Math.floor(Math.random() * 13),
            applyBy: new Date('2021-12-30T22:58:32.786Z'),
            numberOpenings: Math.floor(Math.random() * 3),
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus tempore eos quibusdam, tenetur quas nihil asperiores molestiae ad sunt, dolore, minima blanditiis? Error unde sapiente, temporibus sit eius neque.",
            perks: 'Certificate',
            type: 'External'
        }
        db.Internship.create(data)
            .then((internship) => console.log(internship))
            .catch(err => console.log(err))
    }
}

module.exports = seedDB;