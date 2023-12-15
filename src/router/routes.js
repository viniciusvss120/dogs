const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')
const UserLogin = require('../controller/UserLogin')
const AdminAuth = require('../middleware/AdminAuth')
const upload = require('../config/multer')

router.get("/", (req, res) => {
  res.send("projeto dogs")
})

router.post("/login", UserLogin.login)
router.post("/perdeu", UserLogin.tokenReset)
router.post("/updateToken", UserLogin.updateToken)
router.post("/chengePassword", UserLogin.updatePassword)
router.get("/token", UserLogin.token)

router.get("/user", UserController.listUsers)
router.post("/createuser", UserController.createUser)
router.post("/userId", UserController.listById)
router.put("/edituser",upload.single("file"), UserController.editUser)
router.post("/post",upload.single("file"), UserController.postPhoto)
router.post("/postComents", UserController.postComentarios)
router.post("/postdelete", UserController.deletePost)
module.exports = router;