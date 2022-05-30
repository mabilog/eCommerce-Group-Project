"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, DATABASE_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
// const { v4: uuidv4 } = require("uuid");

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

// not needed for now
// const addItem = async (req, res) => {
//   try {
//     const newItem = req.body;
//     const client = new MongoClient(MONGO_URI, options);
//     await client.connect();
//     console.log("connected!");

//     const db = client.db(DATABASE_NAME);
//     const result = await db.collection("items").insertOne(newItem);
//     console.log(result);

//     result
//       ? sendMessage(res, 200, result, "Add item success!")
//       : sendMessage(res, 400, null, "Add item failed!");

//     client.close();
//     console.log("disconnected");
//   } catch (err) {
//     console.log(err.stack);
//   }
// };

const buyItem = async (req, res) => {
  try {
    const { _id, numInStock, quantity } = req.body;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");
    const db = client.db(DATABASE_NAME);

    const itemBuy = await db
      .collection("items")
      .updateOne({ _id: _id }, { $set: { numInStock: numInStock - quantity } });

    if (itemBuy.modifiedCount > 0) {
      sendMessage(res, 200, itemBuy, "Buy item successfully");
    } else {
      sendMessage(res, 400, null, "Buy item failed");
    }
  } catch (err) {
    console.log(err.stack);
  }
};

// orders collection
// update orders collection and items collection
const cancelItem = async (req, res) => {
  try {
    const { _id, numInStock, quantity } = req.body;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");
    const db = client.db(DATABASE_NAME);

    const itemCancel = await db
      .collection("items")
      .updateOne({ _id: _id }, { $set: { numInStock: numInStock + quantity } });

    if (itemCancel.modifiedCount > 0) {
      sendMessage(res, 200, itemCancel, "Cancel item successfully");
    } else {
      sendMessage(res, 400, null, "Cancel item failed");
    }
  } catch (err) {
    console.log(err.stack);
  }
};

// const deleteItem = async (req, res) => {
//   try {
//     const { _id } = req.body;

//     const client = new MongoClient(MONGO_URI, options);
//     await client.connect();
//     console.log("connected!");
//     const db = client.db(DATABASE_NAME);
//     const result = await db.collection("items").deleteOne({ _id: _id });

//     result.deletedCount === 1
//       ? sendMessage(res, 200, result, "Delete item success")
//       : sendMessage(res, 404, null, "Delete item falied");
//     client.close();
//   } catch (err) {
//     console.log(err.stack);
//   }
// };

// delete order

module.exports = {
  getCompanies,
  getCompany,
  getItems,
  getItem,

  // addItem,
  buyItem,
  cancelItem,
  // deleteItem,
};
