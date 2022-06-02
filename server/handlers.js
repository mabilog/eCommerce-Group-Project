"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, DATABASE_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
// yarn add uuid
const { v4: uuidv4 } = require("uuid");

const sendMessage = (res, status, data, message = "") => {
  return res
    .status(status)
    .json({ status: status, data: data, message: message });
};

// get all companies
const getCompanies = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

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
    const companyId = parseInt(req.params._id);

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db(DATABASE_NAME);

    const result = await db.collection("companies").findOne({ _id: companyId });

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

// get single item by id, _id is string from frentend
const getItem = async (req, res) => {
  try {
    const { _id } = req.params;
    const idNumber = parseInt(_id);

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
          { _id: parseInt(item._id) },
          { $inc: { numInStock: -parseInt(item.quantity) } }
        );
    });

    const orderObj = {
      _id: uuidv4(),
      ...req.body,
    };
    const resultOrder = await db.collection("orders").insertOne(orderObj);
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

    // 2. Iterate through the cartItems and update numInStock
    result.cartItems.forEach(async (item) => {
      const result = await db
        .collection("items")
        .updateOne(
          { _id: parseInt(item.itemId) },
          { $inc: { numInStock: parseInt(item.quantity) } }
        );
      console.log(result);
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

const getItemDetails = async (req, res) => {
  try {
    const cart = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db(DATABASE_NAME);

    const itemDetails = await Promise.all(
      cart.map(async (item) => {
        const result = await db
          .collection("items")
          .findOne({ _id: parseInt(item) });
        return result;
      })
    );

    res.status(200).json({
      status: 200,
      itemDetails,
      message: "hello from the other side",
    });
    client.close();
  } catch (error) {
    console.log(error);
  }
};
const getCategories = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db(DATABASE_NAME);
    const categories = await db.collection("items").distinct("category");
    client.close();

    categories.length
      ? res.status(200).json({
          status: 200,
          categories,
          message: "Categories returned",
        })
      : res.status(500).json({ status: 500, message: "Something went wrong" });
  } catch (err) {
    console.error(err);
  }
};

const getCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ category: category })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, `Shop by ${category} success!`)
      : sendMessage(res, 404, null, `Shop by ${category} failed!`);
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const getBodyLocations = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db(DATABASE_NAME);
    const categories = await db.collection("items").distinct("body_location");
    client.close();

    categories.length
      ? res.status(200).json({
          status: 200,
          categories,
          message: "body_locations returned",
        })
      : res.status(500).json({ status: 500, message: "Something went wrong" });
  } catch (err) {
    console.error(err);
  }
};

const getBodyLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ body_location: location })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, `Shop by ${location} success!`)
      : sendMessage(res, 404, null, `Shop by ${location} failed!`);
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByAZ = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find()
      .sort("name", 1)
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by A-Z success!")
      : sendMessage(res, 404, null, "Shop by A-Z failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = {
  getCompanies,
  getCompany,
  getItems,
  getItem,
  getItemDetails,

  createOrder,
  deleteOrder,

  getCategories,
  getCategory,

  getBodyLocations,
  getBodyLocation,

  shopByAZ,
};
