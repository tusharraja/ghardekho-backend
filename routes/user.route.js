const express= require("express")

const router = express.Router()

const testuserController = require("../controllers/user.controller")

router.get("/test", testuserController.testUserRoute)

module.exports = router