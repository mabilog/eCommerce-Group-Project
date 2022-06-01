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

  getCategories,
  getCategory,
  // below are the new functions for Sidebar navigations
  shopByFitness,
  shopByMedical,
  shopByLifestyle,
  shopByEntertainment,
  shopByGaming,
  shopByIndustrial,
  shopByPetsandAnimals,

  shopByArms,
  shopByWaist,
  shopByHead,
  shopByChest,
  shopByHands,
  shopByNeck,
  shopByFeet,
  shopByWrist,
  shopByTorso,

  shopByAZ,

  shopByPrice_0_100,
  shopByPrice_100_200,
  shopByPrice_200_300,
  shopByPrice_300plus,
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

  .get("/api/get-categories", getCategories)
  .get("/api/get-category/:category", getCategory)

  .get("/api/get-items-fitness", shopByFitness)
  .get("/api/get-items-medical", shopByMedical)
  .get("/api/get-items-lifestyle", shopByLifestyle)
  .get("/api/get-items-entertainment", shopByEntertainment)
  .get("/api/get-items-gaming", shopByGaming)
  .get("/api/get-items-industrial", shopByIndustrial)
  .get("/api/get-items-petsandanimals", shopByPetsandAnimals)

  .get("/api/get-items-arms", shopByArms)
  .get("/api/get-items-Waist", shopByWaist)
  .get("/api/get-items-head", shopByHead)
  .get("/api/get-items-chest", shopByChest)
  .get("/api/get-items-hands", shopByHands)
  .get("/api/get-items-neck", shopByNeck)
  .get("/api/get-items-feet", shopByFeet)
  .get("/api/get-items-wrist", shopByWrist)
  .get("/api/get-items-torso", shopByTorso)

  .get("/api/get-items-az", shopByAZ)

  .get("/api/get-items-price100", shopByPrice_0_100)
  .get("/api/get-items-price200", shopByPrice_100_200)
  .get("/api/get-items-price300", shopByPrice_200_300)
  .get("/api/get-items-price300p", shopByPrice_300plus)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
