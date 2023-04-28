require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./src/router/routes')
const path = require('path')

const app = express()

mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    console.log('conectado')
    app.emit('pronto')
})
.catch(e => console.log('Deu ruim', e))

app.use('/files', express.static(path.resolve(__dirname, 'uploads')))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req,res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
  app.use(cors())
  next()
})

app.use("/",router)

app.on('pronto', () => {
  app.listen(3001, () =>{
      console.log('Acessar http://localhost:3001')
      console.log('Servidor execultando na porta 3001')
  })
})