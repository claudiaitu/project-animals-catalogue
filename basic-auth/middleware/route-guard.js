const Pet = require("../models/pet.model");


const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
       return res.redirect('/login/userLogin')
    }
    next();
}


const isLoggedOut = (req, res, next) => {
    if(req.session.user) {
        return res.redirect('/')
    }
    next();
}


const isOwner = (req, res, next) => {

    Pet.findById(req.params.petId)
    .populate('owner')
    .then((foundPet) => {
        console.log(foundPet);
        if (!req.session.user || foundPet.owner._id.toString() !== req.session.user._id) {
            res.redirect('/allPets')
        } else {
            next()
        }
    })
    .catch((err) => {
        console.log(err)
    })

}

module.exports = {
    isLoggedIn,
    isLoggedOut,
    isOwner
}