var mongoose = require("mongoose");

var cuentaSchema = new mongoose.Schema({
    folio: String,
    numCuenta: String,
    clabe: String,
    celular: String,
    correo: String,
    fecha: String,
    pagos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pago"
        }
    ],
    saldo: Number,
    nip: Number
});

var Cuenta = mongoose.model("Cuenta", cuentaSchema);

module.exports = Cuenta;