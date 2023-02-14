const router = require("express").Router();
const Pet = require("../models/pet.model");

router.get('/', (req, res, next) => {
    Pet.find()
    .then((allPet) => {
        res.render('login/all-pets.hbs', {allPet})
    })
    .catch((err) => {
        console.log(err);
    })
})

// router.post('/all-pets', (req, res, next) => {
//     All.find()
//     .then((allPet) => {
//         console.log(createdPet)
//         res.redirect('/')
    
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })











module.exports = router;