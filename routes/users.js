var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/users");

router.get("/register", function(req, res){
    res.render("users/register");
});

router.post("/register", function(req, res){
    var newUser = new User ({
        firstName: req.body.data.firstName,
        lastName: req.body.data.lastName,
        surName: req.body.data.surName,
        gennder: req.body.data.gennder,
        birthData:{
            country: req.body.data.country,
            state: req.body.data.state,
            birthDate: req.body.data.birthDate,
        },
        identityDocuments:[{
            documentType: req.body.data.documentType,
            number:req.body.data.number
        }],
        nationalities:[{
            nationality:req.body.data.nationality
        }],
        addresses: [{
            streetName: req.body.data.streetName,
            state:req.body.data.state,
            zipCode:req.body.data.zipCode,
            neigborhood:req.body.data.neigborhood,
            municipaly:req.body.data.municipaly,
            exteriorNumber: req.body.data.exteriorNumber,
            interiorNumber: req.body.data.interiorNumber
        }],
        email: req.body.data.email,
        username: req.body.data.username,
        password: req.body.data.password
    });

    User.register(newUser, req.body.data.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/register");
        } else {
            console.log(user)
            return res.redirect("/register");
        }
        
    });
});
    
router.get("/login", function(req,res){
    res.render("users/login", {currentUser: req.user})
});

router.post("/login", passport.authenticate("local" ,
    {
        successRedirect:"/retirar/cuenta",
        failureRedirect:"/login"

    }) ,function(req, res){
    
});

module.exports = router;