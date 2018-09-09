var express     = require("express"),
    router      = express.Router(),
    Pago        = require("../models/pagos"),
    Cuenta      = require("../models/cuentas"),
    moment      = require("moment");
    middleware  = require("../middleware");

router.get("/pago/depositoCuenta", function(req, res){
    res.render("pagos/depositoCuenta")
});

router.post("/pago/depositoCuenta", function(req, res){
    var     numCuenta   = req.body.numCuenta,
            horaFecha   = {
                hora: moment().format('LT'),
                fecha: moment().format('L')
            }
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
                    var text = "FECHA: "+ horaFecha.fecha + "     HORA: " + horaFecha.hora + "     CUENTA DE DEPOSITO: " + cuenta[0].numCuenta + "     EFEC. DEPOSITADO: $" + pago.monto + "     MOTIVO DE PAGO: " + pago.descripcion;
                    res.render("pagos/pagoQR", {cuenta: cuenta[0], horaFecha:horaFecha, pago:pago, text:text});
                }
            });
        }
    })
});

router.get("/pago/tajeta/depositoCuenta", function(req, res){
    res.render("pagos/depositoTarjeta")
});

//, horaFecha: horaFecha, pago:pago


module.exports = router;