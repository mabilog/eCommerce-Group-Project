'use strict';

const express = require('express');
const morgan = require('morgan');

const PORT = 4000;

const {
  getCompanies,
  getCompany,
  getItems,
  getItem,

  addItem,
  updateItem,
  deleteItem,
} = require("./handlers");

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  .get('/bacon', (req, res) => res.status(200).json('🥓'))

  .get("/api/get-companies", getCompanies)
  .get("/api/get-companies/:name", getCompany)
  .get("/api/get-items", getItems)
  .get("/api/get-items/:_id", getItem)

  .post("/api/add-item", addItem)
  .patch("/api/update-item", updateItem)
  .delete("/api/delete-reservation", deleteItem)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
