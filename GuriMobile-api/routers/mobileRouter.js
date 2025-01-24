const express = require("express");
const { getAllMobile, createMobile, getSingleMobile, upDateMobile, deleteMobile } = require("../controllers/mobileControllers");
const Router = express.Router();



Router.get('/', getAllMobile);
Router.get("/findSingle", getSingleMobile)
Router.post('/createmobile', createMobile);
Router.put('/upDateMobile', upDateMobile)
Router.delete('/deleteMobile', deleteMobile)

module.exports = Router;

























