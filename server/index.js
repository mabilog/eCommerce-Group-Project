"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const {
  getCompanies,
  getCompany,
  getItems,
  getItem,

  createOrder,
  deleteOrder,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/api/get-companies", getCompanies)
  .get("/api/get-companies/:_id", getCompany)
  .get("/api/get-items", getItems)
  .get("/api/get-items/:_id", getItem)

  .post("/api/create-order", createOrder)
  .delete("/api/delete-order", deleteOrder)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
