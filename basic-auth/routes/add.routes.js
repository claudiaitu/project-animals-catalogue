const router = require("express").Router();
const Add = require("../models/add.model");
const { render } = require("../app");

router.get('/', (req, res, next) => {
    Add.find()
    .then((addPet) => {
        res.render('login/all-pets.hbs', {addPet})
    })
    .catch((err) => {
        console.log(err);
    })
})

router.get('/add-pet', (req, res, next) => {
    res.render('login/add-pet.hbs')
})


router.get('/create', (req, res, next) => {
    res.render('login/add-pet.hbs')

})
router.post('/create', (req, res, next) => {
    Add.create({
        name: req.body.name,
        species: req.body.species, 
        feeding: req.body.feeding,
        environment: req.body.environment,
    })
    .then((createdPet) => {
        console.log(createdPet)
        res.redirect('/login')
    
    })
    .catch((err) => {
        res.render('login/add-pet.hbs')
        console.log(err)
    })
})

module.exports = router;