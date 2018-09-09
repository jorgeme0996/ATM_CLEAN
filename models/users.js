var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
       firstName: String,
       lastName: String,
       surName: String,
       gennder: String,
       birthData:{
           country: String,
           state: String,
           birthDate: String,
       },
       identityDocuments:[{
           documentType: String,
           number:String
       }],
       nationalities:[{
           nationality:String
       }],
       addresses: [{
           streetName: String,
           state:String,
           zipCode:String,
           neigborhood:String,
           municipaly:String,
           exteriorNumber: String,
           interiorNumber: String
       }],
       email: String,
       username: String,
       password: String,
       cuentas:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cuenta"
       }]
});

UserSchema.plugin(passportLocalMongoose);
    
module.exports = mongoose.model("User", UserSchema);


