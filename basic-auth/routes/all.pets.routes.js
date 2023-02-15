const router = require("express").Router();
const Pet = require("../models/pet.model");
const { isOwner } = require("../middleware/route-guard")

const fileUploader = require('../config/cloudinary.config');

router.get('/', (req, res, next) => {
    Pet.find()
    .then((allPet) => {
        res.render('login/all-pets.hbs', {allPet})
    })
    .catch((err) => {
        console.log(err);
    })
})

router.get('/edit/:petId', isOwner, (req, res, next) => {
    const { petId } = req.params;
   
    Pet.findById(petId)
      .then(petToEdit => {
        console.log(petToEdit, "pet")
        res.render('login/pet-edit.hbs', petToEdit); // <-- add this line

    })
      .catch(error => next(error));
  });

  router.post('/edit/:petId', isOwner, (req, res, next) => {
    const { petId } = req.params;
    const { description, name, age, species, breed, feeding, environment } = req.body;
    console.log(req.body, description)
    Pet.findByIdAndUpdate(petId, { description, name, age, species, breed, feeding, environment }, { new: true })
      
    .then(updatedPet => 
        { console.log(updatedPet, "my updated PET")
            res.redirect(`/allPets`)})
      .catch(error => next(error));
  });


  router.post('/allPet/:petId/delete', isOwner, (req, res, next) => {
    const { petId } = req.params;
   
    Pet.findByIdAndDelete(petId)
      .then(() => res.redirect('/allPets'))
      .catch(error => next(error));
  });

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