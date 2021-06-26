var express = require("express");
var router = express.Router();
var loginController = require("../controller/login");

/* 
This API will be used to login.
*/
router.post("/v1", loginController.login);

module.exports = router;