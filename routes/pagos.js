var express     = require("express"),
    router      = express.Router(),
    Pago        = require("../models/pagos"),
    Cuenta      = require("../models/cuentas"),
    moment      = require("moment");
    middleware  = require("../middleware");

moment.locale();

router.get("/pago/depositoCuenta", function(req, res){
    res.render("pagos/depositoCuenta")
});

router.post("/pago/depositoCuenta", function(req, res){
    
    var     numCuenta   = req.body.numCuenta,
            horaFecha   = new Date();
    Cuenta.find({numCuenta: numCuenta}, function(err, cuenta){
        if(err){
            console.log(err);
        } else {
            Pago.create(req.body.data, function(err, pago){
                if(err){
                    console.log(err)
                } else {
                    pago.save();
                    cuenta[0].pagos.push(pago);
                    var monto = parseInt(req.body.data.monto)
                    cuenta[0].saldo = cuenta[0].saldo + monto;
                    cuenta[0].save();
                    var text = "FECHA: "+ horaFecha + "     CUENTA DE DEPOSITO: " + cuenta[0].numCuenta + "     EFEC. DEPOSITADO: $" + pago.monto + "     MOTIVO DE PAGO: " + pago.descripcion;
                    res.render("pagos/pagoQR", {cuenta: cuenta[0], horaFecha:horaFecha, pago:pago, text:text});
                }
            });
        }
    })
});

router.get("/retirar/cuenta", isLoggedIn, function(req, res){
    res.render("pagos/retiro");
});

router.post("/retirar/cuenta", isLoggedIn, function(req, res){
    var cuenta      = req.body.cuenta,
        data        = {
            monto: req.body.retiro,
            descripcion: "Retiro"
        }
        horaFecha   = new Date();
    Cuenta.find({numCuenta:cuenta}, function(err, cuenta){
        if(err){
            console.log(err);
        } else {
            Pago.create(data, function(err, pago){
                if(err){
                    console.log(err);
                } else {
                    pago.save();
                    var monto = parseInt(data.monto)
                    cuenta[0].saldo = cuenta[0].saldo - monto;
                    cuenta[0].save();
                    var text = "FECHA: "+ horaFecha + "    CUENTA DE RETIRO: " + cuenta[0].numCuenta + "     EFEC. RETIRADO: $" + pago.monto + "     MOTIVO DE RETIRO: " + pago.descripcion + "     SALDO DISPONIBLE: " + cuenta[0].saldo;
                    res.render("pagos/retiroQR", {cuenta: cuenta[0], horaFecha:horaFecha, pago:pago, text:text});
                }
            })
        }
    });

});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}
//, horaFecha: horaFecha, pago:pago


module.exports = router;