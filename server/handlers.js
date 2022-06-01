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

const shopByFitness = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ category: "Fitness" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Fitness success!")
      : sendMessage(res, 404, null, "Shop by Fitness failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByMedical = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ category: "Medical" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Medical success!")
      : sendMessage(res, 404, null, "Shop by Medical failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByLifestyle = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ category: "Lifestyle" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Lifestyle success!")
      : sendMessage(res, 404, null, "Shop by Lifestyle failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByEntertainment = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ category: "Entertainment" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Entertainment success!")
      : sendMessage(res, 404, null, "Shop by Entertainment failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByGaming = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ category: "Gaming" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Gaming success!")
      : sendMessage(res, 404, null, "Shop by Gaming failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByIndustrial = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ category: "Industrial" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Industrial success!")
      : sendMessage(res, 404, null, "Shop by Industrial failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByPetsandAnimals = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ category: "Pets and Animals" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Pets and Animals success!")
      : sendMessage(res, 404, null, "Shop by Pets and Animals failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByArms = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ body_location: "Arms" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Arms success!")
      : sendMessage(res, 404, null, "Shop by Arms failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByWaist = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ body_location: "Waist" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Waist success!")
      : sendMessage(res, 404, null, "Shop by Waist failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByHead = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ body_location: "Head" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Head success!")
      : sendMessage(res, 404, null, "Shop by Head failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByChest = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ body_location: "Chest" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Chest success!")
      : sendMessage(res, 404, null, "Shop by Chest failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByHands = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ body_location: "Hands" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Hands success!")
      : sendMessage(res, 404, null, "Shop by Hands failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByNeck = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ body_location: "Neck" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Neck success!")
      : sendMessage(res, 404, null, "Shop by Neck failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByFeet = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ body_location: "Feet" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Feet success!")
      : sendMessage(res, 404, null, "Shop by Feet failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByWrist = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ body_location: "Wrist" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Wrist success!")
      : sendMessage(res, 404, null, "Shop by Wrist failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByTorso = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db
      .collection("items")
      .find({ body_location: "Torso" })
      .toArray();
    result.length > 0
      ? sendMessage(res, 200, result, "Shop by Torso success!")
      : sendMessage(res, 404, null, "Shop by Torso failed!");
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

const shopByPrice_0_100 = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db.collection("items").find().toArray();

    const result_0_100 = result.map((item) => {
      const priceNumber = Number(item.price.replace(/[^0-9\.]+/g, ""));

      if (priceNumber < 100) return item;
    });

    result.length > 0
      ? sendMessage(res, 200, result_0_100, "Shop by price 0-100 success!")
      : sendMessage(res, 404, null, "Shop by price 0-100  failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByPrice_100_200 = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db.collection("items").find().toArray();

    const result_100_200 = result.map((item) => {
      const priceNumber = Number(item.price.replace(/[^0-9\.]+/g, ""));

      if (priceNumber >= 100 && priceNumber < 200) return item;
    });

    result.length > 0
      ? sendMessage(res, 200, result_100_200, "Shop by price 100-200 success!")
      : sendMessage(res, 404, null, "Shop by price 100-200 failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByPrice_200_300 = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db.collection("items").find().toArray();

    const result_200_300 = result.map((item) => {
      const priceNumber = Number(item.price.replace(/[^0-9\.]+/g, ""));

      if (priceNumber >= 200 && priceNumber < 300) return item;
    });

    result.length > 0
      ? sendMessage(res, 200, result_200_300, "Shop by price 200-300 success!")
      : sendMessage(res, 404, null, "hop by price 200-300 failed!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const shopByPrice_300plus = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db.collection("items").find().toArray();

    const result_300b = result.map((item) => {
      const priceNumber = Number(item.price.replace(/[^0-9\.]+/g, ""));

      if (priceNumber >= 300) return item;
    });

    result.length > 0
      ? sendMessage(res, 200, result_300b, "Shop by price 300+ success!")
      : sendMessage(res, 404, null, "Shop by price 300+  failed!");
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
};
