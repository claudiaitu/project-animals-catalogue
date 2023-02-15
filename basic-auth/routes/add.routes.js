const router = require("express").Router();
const Pet = require("../models/pet.model");

const fileUploader = require('../config/cloudinary.config');






router.get('/add-pet', (req, res, next) => {
    res.render('login/add-pet.hbs')

})
router.post('/add-pet', fileUploader.single('imageUrl'), (req, res, next) => {
   console.log("made it to line 17")
    console.log(req.body, req.file)
    Pet.create({
        description: req.body.description,
        name: req.body.name,
        age: req.body.age,
        species: req.body.species, 
        breed: req.body.breed,
        feeding: req.body.feeding,
        environment: req.body.environment,
        imageUrl: req.file.path,
        owner: req.session.user._id,
    })
    .then((createdPet) => {
        console.log(createdPet)
        res.redirect('/allPets')
    
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router;
