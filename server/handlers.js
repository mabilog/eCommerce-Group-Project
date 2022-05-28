"use strict";

const { MongoClient } = require("mongodb");
require ("dotenv").config();
const { MONGO_URI, DATABASE_NAME } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
//const { v4: uuidv4 } = require("uuid");

const sendMessage = (res, status, data, message="") => {
    return res.status(status).json({ status:status, data:data , message:message })
};

// get all companies
const getCompanies = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db.collection("companies").find().toArray();
    result.length > 0
        ? sendMessage(res, 200, result, "Found companies success!")
        : sendMessage(res, 404, null, "Companies not found!")
    client.close();
  }catch (err) {
        console.log(err.stack);
  }
};

// get single conpany by name
const getCompany = async (req, res) => {
  try {
    const thisCompany = req.params
    console.log(thisCompany)
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");
    const db = client.db(DATABASE_NAME);
    const result = await db.collection("companies").findOne(thisCompany);
    console.log(result)
    result
        ? sendMessage(res, 200, result, "Found company success!")
        : sendMessage(res, 404, null, "Company not found!")

    client.close();
  }catch (err) {
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
        : sendMessage(res, 404, null, "Items not found")

    client.close();
  }catch (err) {
    console.log(err.stack);
  }
};

// get single item by id
const getItem = async (req, res) => {
  try {
    const thisItem = req.params;
    console.log(thisItem);
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(DATABASE_NAME);
    
    const result = await db.collection("items").findOne(thisItem);
console.log(result);
    result
    ? res.status(200).json({ status: 200, data: result, message: "Found item success!" })
    : res.status(400).json({ status: 400, message: "Item not found" });

    client.close();
   
   } catch (err) {
      console.log(err.stack);
    }
};

const addItem = async (req, res) => {
  try {
    const newItem = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");

    const db = client.db(DATABASE_NAME);
    const result = await db.collection("items").insertOne(newItem)
    console.log(result)

    result
        ? sendMessage(res, 200, result, "Add item success!")
        : sendMessage(res, 400, null, "Add item failed!")

    client.close();
    console.log("disconnected")
    }catch (err) {
    console.log(err.stack);
    }
};
s
const updateItem = async (req, res) => {
  try { 
    const {_id, name, price, body_location, category, imageSrc, numInStock, companyId} = req.body;
    
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");
    const db = client.db(DATABASE_NAME);

    const itemCancel = await db.collection("items").updateOne(
        { _id: _id },
        { $set: { "seats.$.isAvailable": true }}
    );

    const seatBook = await db.collection("items").updateOne(
        { flight: flight, "seats.id": newSeat},
        { $set: { numInStock: numInStock + 1 }}
    )

    const reservationUpdate = await db.collection("items").updateOne(
        { id },
        { $set: { seat: newSeat, givenName, surname, email}},
    )

    if (
      itemCancel.modifiedCount > 0 
        && seatBook.modifiedCount > 0 
        && reservationUpdate.modifiedCount > 0){
            sendMessage(res, 200, reservationUpdate, "Update item successfully")
    } else {
            sendMessage(res, 400, null, "Update item failed")
    }
  } catch (err) {
      console.log(err.stack);
    }
};

const deleteItem = async(req, res) => {   
 try { 
    const {flight, id, seat} = req.body;
    console.log(flight, id, seat)
    if (JSON.stringify(req.body).length>2){
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        console.log("connected!");
        const db = client.db(DATABASE_NAME);
        const result = await db.collection("items").deleteOne({"id":id});
        const cancelSeat = await db.collection("companies").updateOne(
            { flight: flight, "seats.id": seat},
            { $set: { "seats.$.isAvailable": true }}
        )
        console.log(result)
        console.log(cancelSeat)
        result
            ? sendMessage(res, 200, result, "Delete item success")
            : sendMessage(res, 404, null, "Delete item falied")
        client.close();
    } else {
        sendMessage(res, 403, null, "required field not filled")
    }
  } catch (err) {
    console.log(err.stack);
  }
};


module.exports = {
  getCompanies,
  getCompany,
  getItems,
  getItem,

  addItem,
  updateItem,
  deleteItem,
};