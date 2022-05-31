"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, DATABASE_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const sendMessage = (res, status, data, message = "") => {
  return res
    .status(status)
    .json({ status: status, data: data, message: message });
};

// get all companies
const getCompanies = async (req, res) => {
  // console.log(process.env.MONGO_URI);
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db.collection("companies").find().toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Found companies success!")
      : sendMessage(res, 404, null, "Companies not found!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

// get single conpany by name
const getCompany = async (req, res) => {
  try {
    const { _id } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");
    const db = client.db(DATABASE_NAME);
    const result = await db.collection("companies").findOne({ _id });
    console.log(result);
    result
      ? sendMessage(res, 200, result, "Found company success!")
      : sendMessage(res, 404, null, "Company not found!");

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

// get all items
const getItems = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db.collection("items").find().toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Found items success!")
      : sendMessage(res, 404, null, "Items not found");

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

// get single item by id
const getItem = async (req, res) => {
  try {
    const { _id } = req.params;
    const idNumber = parseInt(_id);
    console.log(idNumber);
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(DATABASE_NAME);

    const result = await db.collection("items").findOne({ _id: idNumber });
    result
      ? res
          .status(200)
          .json({ status: 200, data: result, message: "Found item success!" })
      : res.status(400).json({ status: 400, message: "Item not found" });

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const createOrder = async (req, res) => {
  const order = req.body;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    console.log("connecting");
    const db = client.db(DATABASE_NAME);
    /**
     * 1. iterating through the req.body.cartItems array,
     * 2. finding the corresponding _id,
     * 3. and updating each document in the items collection
     */
    order.cartItems.forEach(async (item) => {
      const result = await db
        .collection("items")
        .updateOne(
          { _id: parseInt(item.itemId) },
          { $inc: { numInStock: -parseInt(item.quantity) } }
        );

      console.log(result);
    });

    const orderObj = {
      _id: uuidv4(),
      ...req.body,
    };
    const resultOrder = await db.collection("orders").insertOne(orderObj);

    console.log(resultOrder);

    res
      .status(200)
      .json({ status: 200, resultOrder, orderObj, message: "sup" });

    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Something went wrong when creating a new order",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");
    const db = client.db(DATABASE_NAME);
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { _id } = req.query;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db(DATABASE_NAME);

    // 1. Find order using _id
    const result = await db.collection("orders").findOne({ _id });
    console.log("findOne: ", result);

    // 2. Iterate through the cartItems and update numInStock
    result.cartItems.forEach(async (item) => {
      const result = await db
        .collection("items")
        .updateOne(
          { _id: parseInt(item.itemId) },
          { $inc: { numInStock: parseInt(item.quantity) } }
        );
      console.log("cartItems: ", result);
    });

    // 3. Delete order using _id
    const resultDeleteOrder = await db.collection("orders").deleteOne({ _id });

    res.status(200).json({ status: 200, result, resultDeleteOrder });
    client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      status: 500,
      message: "Someting went wrong",
    });
  }
};
module.exports = {
  getCompanies,
  getCompany,
  getItems,
  getItem,

  createOrder,
  deleteOrder,
};
