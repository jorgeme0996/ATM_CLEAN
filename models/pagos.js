var mongoose    = require("mongoose"),
    uniqid      = require("uniqid");

var pagoSchema = new mongoose.Schema({
    monto: String,
    convenio: String,
    referencia: String,
    descripcion: String,
    concepto: String
})

var Pago = mongoose.model("Pago", pagoSchema);

module.exports = Pago;