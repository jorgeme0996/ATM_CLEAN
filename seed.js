var mongoose = require("mongoose");
var User = require("./models/users");
var Cuenta = require("./models/cuentas");
var Pago = require("./models/pagos")

var data = [
    // {
    //     firstName: "PERSONA1",
    //     lastName: "APPATERNO",
    //     surName: "APMATERNO",
    //     gennder: "MALE",
    //     birthData:{
    //         country: "MEX",
    //         state: "CDMX",
    //         birthDate: "1996-03-09",
    //     },
    //     identityDocuments:[{
    //         documentType: "CURP",
    //         number: "MAEJ960309HDFRSR00"
    //     },
    //     {
    //         documentType: "INE",
    //         number:"1012345601"
    //     }],
    //     nationalities:[{
    //         nationality:"MEX",
    //     }],
    //     addresses: [{
    //         streetName: "ISSAC NEWTON 95 INTERIOR 1",
    //         state: "EM",
    //         zipCode: "09410",
    //         neigborhood: "Cientificos",
    //         municipaly: "Toluca Laredo",
    //         exteriorNumber: "95",
    //         interiorNumber: "1"
    //     }],
    //     email: "ejemplo@ejemplo.com",
    // },


    {
        firstName: "PERSONA2",
        lastName: "APPATERNO",
        surName: "APMATERNO",
        gennder: "FEMALE",
            birthData:{
            country: "MEX",
            state: "CDMX",
            birthDate: "1990-09-28",
        },
        identityDocuments:[{
            documentType: "CURP",
            number: "PUGA900928MDFWER06"
        },
        {
            documentType: "INE",
            number:"1234567890"
        }],
        nationalities:[{
            nationality:"USA",
        }],
        addresses: [{
            streetName: "FRANKLIN 39",
            state: "LA",
            zipCode: "09410",
            neigborhood: "Main Street",
            municipaly: "Pasadena",
            exteriorNumber: "39",
        }],
        email: "ejemplo23@ejemplo.com",
        username: "ejemplo123",
        password: "0996"
    }
]

function seedDB(){

    User.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Se elimino TODO!!!")
        } 
    });

    Cuenta.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Se elimino TODO!!!")
        } 
    });

//     for(let i in data){
//         User.create(data[i], function(err, user){
//             if(err){
//                 console.log(err)
//             } else {
//                 console.log("Acabas de añadir un usuario");
//                 Cuenta.create(
//                     {
//                         folio: "5635709475",
//                         numCuenta: "6186456702",
//                         clabe: "82928382024930272468",
//                         celular: "5555555555",
//                         correo: "correoprueba2@dominio2.com",
//                         fecha: "10/09/2018 09:45:19",
//                         saldo: 0,
//                         nip: 0996
//                     }, function(err, cuenta){
//                         if(err){
//                             console.log(err)
//                         } else {
//                             user.cuentas.push(cuenta);
//                             user.save();
//                             console.log(user);
//                         }
//                     }
//                 )
//             }
//         })
//     }
 }

module.exports = seedDB;