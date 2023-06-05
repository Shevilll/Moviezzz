const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config({ path: ".env.local" });

const MONGO_URL = process.env.MONGO_URL;
const PORT = 8000;

`structure: {
    id:default
    title:str,
    img:url,
}`;
async function connectAndInsert(data) {
    try {
        const client = await MongoClient.connect(MONGO_URL);

        const db = client.db("Moviezzz");
        const collection = db.collection("watchlist");

        const result = await collection.insertOne(data);
        console.log("Document inserted successfully", result);

        client.close();
        return result;
    } catch (error) {
        console.log("Error occurred while connecting to MongoDB:", error);
    }
}
async function connectAndDelete(data) {
    try {
        const client = await MongoClient.connect(MONGO_URL);

        const db = client.db("Moviezzz");
        const collection = db.collection("watchlist");

        const result = await collection.deleteOne(data);
        console.log("Document deleted successfully", result);

        client.close();
        return result;
    } catch (error) {
        console.log("Error occurred while connecting to MongoDB:", error);
    }
}
async function connectAndFind() {
    try {
        const client = await MongoClient.connect(MONGO_URL);

        const db = client.db("Moviezzz");
        const collection = db.collection("watchlist");

        const documents = await collection.find({}).toArray();
        client.close();
        return documents;
    } catch (error) {
        console.log("Error occurred while connecting to MongoDB:", error);
    }
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get("/get", async (req, res) => {
    const docs = await connectAndFind();
    res.status(200).json(docs);
});
app.post("/post", async (req, res) => {
    const data = req.body;
    const sol = await connectAndInsert(data);
    res.status(201).json(sol);
});
app.post("/delete", async (req, res) => {
    const data = req.body;
    const sol = await connectAndDelete(data);
    res.status(201).json(sol);
});
