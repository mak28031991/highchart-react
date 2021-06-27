var express = require("express");
var router = express.Router();
var dashboardController = require("../controller/dashboard");

/* 
This API will be used to get toll summary.
*/
router.post("/toll_summary/v1", dashboardController.getTollSummary);
router.get("/monthly_cards/v1", dashboardController.getMonthlyCards);

module.exports = router;