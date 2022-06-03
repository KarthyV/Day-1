import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/movies", moviesRouter);

// NOTE: NODE - MONGODB connection

const MONGO_URL = process.env.MONGO_URL;

const createConnection = async () => {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB connected");
  return client;
};

export const client = await createConnection();

app.get("/", (req, res) => {
  res.send("Hellow");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
