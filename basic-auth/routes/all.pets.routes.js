const router = require("express").Router();
const Pet = require("../models/pet.model");
const { isOwner } = require("../middleware/route-guard")

router.get('/', (req, res, next) => {
    Pet.find()
    .then((allPet) => {
        res.render('login/all-pets.hbs', {allPet})
    })
    .catch((err) => {
        console.log(err);
    })
})

router.get('/allPet/:petId/edit', isOwner, (req, res, next) => {
    const { petID } = req.params;
   
    Pet.findById(petID)
      .then(petToEdit => {
        res.render('login/pet-edit.hbs', { Pet: petToEdit }); // <-- add this line

    })
      .catch(error => next(error));
  });

  router.post('/allPet/:petId/edit', isOwner, (req, res, next) => {
    const { petId } = req.params;
    const { name, species, feeding, environment } = req.body;
   
    Pet.findByIdAndUpdate(petId, { name, species, feeding, environment }, { new: true })
      .then(updatedPet => res.redirect(`/allPet/${updatedPet.id}`)) // go to the details page to see the updates
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