const express = require("express")

const server = express()
const carsRouter=require("./cars/cars-router");
// SİHRİNİZİ GÖSTERİN
server.use(express.json());
server.use("/api/cars", carsRouter)

module.exports = server
