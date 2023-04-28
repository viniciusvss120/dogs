const mongoose = require('mongoose')

class Schema {
   UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    fotos: {type: Array}
  })
   PasswordToken = new mongoose.Schema({
    userEmail: {type: String, required: true},
    token: {type: String, required: true},
    used: {type: Boolean, required: true},
  
  })
}


// const PasswordToken = new mongoose.Schema({
//   token: {type: String, required: true},
//   used: {type: Boolean}
// })

// comentarios: {
//   user: {type: String},
//   coment: { type: String}
// }
// ,
// foto:{
// token: {type: String},
// nome: {type: String},
// peso: {type: String},
// idade: {type: String},
// img: {type: String}
// }

module.exports = new Schema()