const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, DATABASE_NAME } = process.env;

const { companies } = require("./data/companies");
const { items} = require("./data/items");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
  
const batchImport = async () => {

  try {

    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
  
    // connect to the client
    await client.connect();
  
    // connect to the database "slingair"
    const db = client.db(DATABASE_NAME);
    console.log("connected!");

   const result1 = await db.collection("companies").insertMany(companies);

   result1.writeConcernError ? 
     console.log("insert failed !") :
     console.log("inserMany success !");

   const result2 = await db.collection("items").insertMany(items);

   result2.writeConcernError ? 
     console.log("insert failed !") :
     console.log("inserMany success !");

   // close the connection to the database server
    client.close();
    console.log("disconnected!");


  } catch (err) {
      console.log(err.stack);
    }
};

batchImport();
  