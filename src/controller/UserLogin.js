const Users = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const PasswordToken = require('../models/PasswordToken')
const secret = "EmBuscaDoProgresso"

class UserLogin {
  async login(req, res){
    try {
      const {username, password} = req.body

      const findEmail = await Users.findAll({email: username})
      
      if(findEmail) {
        let senha = await bcrypt.compare(password, findEmail[0].password)
        if(senha){
          let token = jwt.sign({id: findEmail[0]._id , email: findEmail[0].email, password: findEmail[0].password,
          name: findEmail[0].name}, secret)
          
          let userId = jwt.verify(token,secret, (err, data) => {
            if(err) {
              console.log("Deu ruim",err)
            }else{
              return data.id
            }
          })

          res.status(200)
          res.json({token, userId})
        }else{
          res.status(401)
          res.json("Senha incorreta")
        }
      }
    } catch (error) {
      console.log("Email incorreto!!",error)
    }
  }
  async token(req,res){
    try {
      const userToken = await PasswordToken.findToken()

      if(userToken){

        res.json(userToken)
      }else{
        console.log("Deu ruim :(")
      }
    } catch (error) {
      console.log(error)
    }
  }
  async tokenReset(req,res){
    try {
      const {email} = req.body

      const findEmail = await Users.findAll({email})
      console.log(findEmail[0].email)
      if(findEmail){
    
        const token = Math.floor(Math.random() * 125542).toString()
        const content = {
          token,
          title: "Código de verificação."
        }

        let transporter = nodemailer.createTransport({
          host: "SMTP.office365.com",
          port: 587,
          secure: false,
          auth: {
              user: "vinicius100@live.com",
              pass: "93062435vi"
          }
      })
    
        transporter.sendMail({
          from: "DOGS <vinicius100@live.com>",
          to: "viniciusvss120@gmail.com",
          subject: content.title,
          text: "Token",
          html: `<input type="text" style="font-size: 45px" value=${content.token.toString()} disabled />`
        })
          .then(async (msg) => {
            try {
              console.log(findEmail[0].email)
              let userToken = {
                userEmail: findEmail[0].email,
                token,
                used: false
              }
              // const verifyToken = await PasswordToken.findToken()
              // if(verifyToken)
              const create = await PasswordToken.createToken(userToken)
              
              
              if(create){
                console.log("Deu certo")
              }else{
                console.log("Deu ruim")
              }
              console.log(msg)
            } catch (error) {
              console.log("Deu ruim", error)
            }

          })
          .catch(err => console.log("Deu ruim",err))


        res.json("Token gerado!")
      }else{
        res.status(404)
        console.log("Deu ruim!")
      }
    } catch (error) {
      console.log("Deu ruim!",error)
    }
  }

  async createPasswordToken(token){
    try {

      let userToken = {
        token,
        used: false
      }
      const create = await PasswordToken.createToken(userToken)

      if(create){
        console.log("Deu certo")
      }else{
        console.log("Deu ruim")
      }
    } catch (error) {
      console.log(error)
    }
  }
  async updateToken(req,res){
    try {
      const {token} = req.body

      const findToken = await PasswordToken.findToken({token})

      if(findToken[0].used === false){
        res.status(200)
        res.json(findToken[0].userEmail)
      }else{
        res.status(401)
        res.json("Deu ruim")
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(req, res) {
    try {
      const {email,password} = req.body

      const findUser = await Users.findAll({email})
      if(findUser.length > 0) {
        
      await Users.updateSenha(findUser[0]._id, {password})
        res.status(200)
        res.json("Deu certo")
      }else{
        console.log("Deu ruim")
      }
    } catch (error) {
      console.log(error)
    }
  }

}


module.exports = new UserLogin()