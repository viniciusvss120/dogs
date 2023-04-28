const Users = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// const path = require('path')

const secret = "EmBuscaDoProgresso"

class UserController {
  // async login(req, res){
  //   try {
  //     const {username, password} = req.body

  //     const findEmail = await Users.findAll({email: username})
  
  //     if(findEmail) {
  //       let senha = await bcrypt.compare(password, findEmail[0].password)
  //       if(senha){
  //         let token = jwt.sign({id: findEmail[0]._id , email: findEmail[0].email, password: findEmail[0].password,
  //         name: findEmail[0].name}, secret)

  //         let userId = jwt.verify(token,secret, (err, data) => {
  //           if(err) {
  //             console.log("Deu ruim",err)
  //           }else{
  //             return data.id
  //           }
  //         })

  //         res.status(200)
  //         res.json({token, userId})
  //       }else{
  //         res.status(401)
  //         res.json("Senha incorreta")
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Email incorreto!!",error)
  //   }
  // }

  async listUsers(req, res) {
    try {
      const getUser = await Users.findAll()

      if(getUser){
        // const user = getUser.filter(item => item._id === '6418640ee00353e2b7a911aa')
        // console.log(getUser)
        // const url = 'http://localhost:3001/files/'
        res.json(getUser)
        
      }else{
        console.log('Deu ruim')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async listById(req,res){
    try {
      const {id,user_id} = req.body

      
      const findUser = await Users.findAll({_id: user_id})
      const post = findUser[0].fotos.filter(item => item.id === id)
      res.json(post)
      // console.log(findUser)
    } catch (error) {
      res.status(404)
      console.log(error)
    }
  }

  async createUser(req, res) {
    try {
      const {name, email, password, fotos} = req.body
      
      let user = {
        name,
        email,
        password,
        fotos
      }

      const userFind = await Users.findAll({email})
      console.log(userFind.length)
      if(userFind.length <= 0){
        throw new Error("Usuário existente!!")
      } else{
        const create =  await Users.createUser(user);

        if(create){
          res.status(200)
          res.json(create)
        }else {
          console.log('Deu ruim!!')
        }
      }


    } catch (error) {
      throw new Error(error)
    }
  }

  async editUser(req,res){
    try {
      const {_id,id,author, title, date, peso, idade, page, total, user} = req.body
      const file = req.file

      let postImg = {
        id,
        author,
        title,
        date,
        img: file.path,
        peso,
        idade,
        page,
        total,
        user
      }
      const find = await Users.findAll({_id})
      const post = find[0].fotos.find(item => item.id === id)
      Object.assign(post, postImg)

     await Users.userEdit(_id,find[0].fotos)
      res.send("Editado com sucesso")
      res.json( '../../uploads/1680477695882.jpg');
    
    } catch (error) {
      console.log(error)
    }
  }

  // async recuperarSenha(req,res){
  //   try {
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  async photo(req, res){
    try {
      const {_id,nome, peso, idade} = req.body
      const file = req.file

      let user = {
        nome, 
        peso,
        idade,
        foto: file
      }
      console.log(user)

      // const find = await Users.findAll({
      //   _id
      // })
      
      // const verify = find.map(item => item )
    
      // verify[0].fotos.forEach(item => {
      //   item.img = user.foto
      // })
      // console.log(verify[0])
      // const post = await Users.post(_id,verify[0])

      // if(post){
      //   res.status(200)
      //    res.json("Postado !!")
      //  }else{
      //   res.status(401)
      //   console.log("Deu ruim")
      //  }
    } catch (error) {
      console.log('Deu ruim!!', error)
    }
  }

  async postPhoto(req,res){
    try {
      const {_id,id,author, title, date, peso, idade, page, total, user} = req.body
      const file = req.file;

      let postImg = {
        id,
        author,
        title,
        date,
        img: file.path,
        peso,
        idade,
        page,
        total,
        user,
        comments: []
      }
      console.log(postImg)
       const find = await Users.findAll({
        _id
       })
       if(find){
        const verify = find.map(item => item )
    
        verify.forEach(item => {
          item.fotos.push(postImg)
          return item
        })
        verify.push(postImg)

        const post = await Users.post(_id,verify[0])

        if(post){
         res.json("Postado !!")
        }else{
         res.status(401)
         console.log("Deu ruim")
        }
       }else{
        console.log("Usuário não encontrado")
       }
      
      
    } catch (error) {
      console.error(error)
    }
  }

  async postComentarios(req, res) {
    try {
      const {_id,id, comment} = req.body
      console.log(_id,id, comment)
      const user = await Users.findAll({_id})
      comment.user = user[0].name
      let post = user[0].fotos.find(item => item.id === id)
      post.comments.push(comment)
      // console.log(post.comments)

      await Users.post(_id, user[0])
      res.status(200)
      res.json(post.comments)

    } catch (error) {
      res.status(401)
      console.error("deu ruim!", error)
    }
  }

  async deletePost(req,res){
    try {
      const {_id,id} = req.body

      const user = await Users.findAll({_id})

      const post = user[0].fotos.filter(item =>item.id !== id)
      const resp = await Users.postDelete(_id, post)

      if(resp){
        res.send('Deletado!!')
      }else{
        console.error('Deu ruim!')
      }

    } catch (error) {
      res.status(401)
      console.log(error)
    }
  }

}

module.exports = new UserController()