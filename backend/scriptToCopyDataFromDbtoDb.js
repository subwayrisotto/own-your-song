const express = require("express");
const dotenv = require('dotenv');
const { MongoClient } = require("mongodb");
dotenv.config();

const app = express();
const port = 5050; // Change as needed

const sourceUri = "mongodb+srv://vercel-admin-user-67af659307f5b00024ed01bd:cm9W3k1zXjsfhJqw@cluster0.kpj3c.mongodb.net/OYS_DB?retryWrites=true&w=majority"
const destUri = "mongodb+srv://vercel-admin-user-67af659307f5b00024ed01bd:cm9W3k1zXjsfhJqw@cluster0.kpj3c.mongodb.net/OYS_PROD?retryWrites=true&w=majority"
const collectionName = "Subscriptions "; 

app.get("/copy-collection", async (req, res) => {
  const sourceClient = new MongoClient(sourceUri);
  const destClient = new MongoClient(destUri);

  try {
    await sourceClient.connect();
    await destClient.connect();

    const sourceDB = sourceClient.db("OYS_DB");
    const destDB = destClient.db("OYS_PROD");

    const data = await sourceDB.collection(collectionName).find().toArray();
    if (data.length > 0) {
      await destDB.collection(collectionName).insertMany(data);
      res.json({ success: true, message: `Copied ${data.length} documents!` });
    } else {
      res.json({ success: false, message: "No documents to copy." });
    }
  } catch (error) {
    console.error("Error copying collection:", error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    await sourceClient.close();
    await destClient.close();
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));