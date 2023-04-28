const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {UserSchema} = require('../config/db')


const UserModel = mongoose.model('users', UserSchema)

class User {

  async findAll(filter) {
    try {

      const findUser = await UserModel.find(filter)

      if(findUser){
        return findUser
      }else{
        console.log("Deu ruim!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  async createUser(user){
    try {
      let hash = await bcrypt.hash(user.password, 10)
      user.password = hash

      const userCreate = await UserModel.create(user)
      console.log(userCreate)
      return userCreate
    } catch (error) {
      console.log(error)
    }
  }

  async userEdit(_id,user) {
    try {
      console.log(user)
      const edit = await UserModel.findByIdAndUpdate({_id}, {
       fotos: user
      })
      return edit

    } catch (error) {
      console.log(error)
    }
  }
  async updateSenha(_id, senha){
    try {
      console.log(senha.password)
      let hash = await bcrypt.hash(senha.password, 10)
      console.log(hash)

      const edit = await UserModel.findByIdAndUpdate({_id}, {
        password: hash
       })
       return edit
 
    } catch (error) {
      console.log(error)
    }
  }
  async post(_id,user) {
    try {
      console.log(user.fotos)
      const post = user.fotos
      const edit = await UserModel.findByIdAndUpdate(_id, {
        fotos: post
    })
      return edit

    } catch (error) {
      console.log(error)
    }
  }
  async postDelete(_id,post) {
    try {

      const edit = await UserModel.findByIdAndUpdate(_id, {
        fotos: post
      })
      return edit

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new User()