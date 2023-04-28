
const mongoose = require('mongoose')
const {PasswordToken} = require('../config/db')


const Usertoken = mongoose.model('passwordtoken', PasswordToken)

class Token {
  async findToken(filter){
    try {
      const res = await Usertoken.find(filter)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async createToken(useToken){
    try {
      console.log(useToken)
      const userCreate = await Usertoken.create(useToken)
      console.log(userCreate)
      return userCreate
    } catch (error) {
      console.log(error)
    }
  }
  
}

module.exports = new Token()