var express         = require("express"),
    router          = express.Router(),
    User            = require("../models/users");
    Cuenta          = require("../models/cuentas");

router.get("/new/cuenta", function(req, res){
    res.render("cuentas/nueva")
});

router.post("/new/cuenta", function(req, res){
    var firstName    = req.body.firstName,
        email       = req.body.email;

    User.find({firstName: firstName, email:email}, function(err, user){
        if(err){
            console.log(err)
        } else {
            Cuenta.create(req.body.data, function(err, cuenta){
                if(err){
                    console.log(err)
                } else {
                    cuenta.save();
                    user[0].cuentas.push(cuenta);
                    user[0].save();
                    res.render("cuentas/nueva")
                }
            })
        }
    })

});

module.exports = router;