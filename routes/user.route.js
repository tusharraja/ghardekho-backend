const express = require("express");
const testuserController = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/test", testuserController.testUserRoute);

module.exports = router;
