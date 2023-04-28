const jwt = require('jsonwebtoken')
const secret = "O Palmeiras não tem mundial"
const Users = require('../models/Users')


class AdminAuth{

    // Falta validações para acessar as funcionalidades do sistemas
    decoded(req,res,next){
        const authToken = req.headers['authorization']
        if(authToken != undefined){
            const bearer = authToken.split(' ')
            let token = bearer[1]
            jwt.verify(token,secret,(err,data) => {
                if(err){
                    res.status(401)
                    res.json({err: "Token Invalido!"})
                }else {          
                    // res.status(200)
                    req.token = token
                    req.loggedUser = {id: data.id, email: data.email}
                    next()
                }
            })
        }else{
            res.status(401)
            res.json({err: "falha Token Invalido!!"})
        }
    }

    validateEdit(req,res,next){
        // Essa função validará se o usuário logado esta editando apenas os imoveis que ele postou.
        const authToken = req.headers['authorization']
        
        if(authToken != undefined){
            const bearer = authToken.split(' ')
            let token = bearer[1]
            console.log(token)
            jwt.verify(token,secret, async (err,data) => {
                if(err){
                    res.status(401)
                    res.json({err: "Token Invalido!!!"})
                }else{
                    req.idUser = {id: data.id}
                    next()
                    // const findUser = await Users.findAll({_id: data.id})
                    // console.log(findUser)

                    // if(findUser) {
                    //     req.idUser = {id: data.id}
                    //     next()
                    // }else{
                    //     res.json("Deu ruim, usuário invalido")
                    // }
                }

            })
        } else{
            console.log("Deu ruim!")
        }
    }
    async findUser(req, res, next){
        const email = req.body.email

        const findEmail = await Users.findAll({email})

        if(findEmail.length < 0){
            req.user = findEmail[0]._id
        }

    }
}

module.exports = new AdminAuth()