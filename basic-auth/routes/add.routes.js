const router = require("express").Router();
const Pet = require("../models/pet.model");
const { render } = require("../app");







router.get('/add-pet', (req, res, next) => {
    res.render('login/add-pet.hbs')

})
router.post('/add-pet', (req, res, next) => {
    Pet.create({
        name: req.body.name,
        species: req.body.species, 
        feeding: req.body.feeding,
        environment: req.body.environment,
        
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