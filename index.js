import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// NOTE: NODE - MONGODB connection

const MONGO_URL = process.env.MONGO_URL;

const createConnection = async () => {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB connected");
  return client;
};

const client = await createConnection();

app.get("/", (req, res) => {
  res.send("Hellow");
});

app.get("/movies", async (req, res) => {
  const movies = await client.db("B33WD").collection("movies").find().toArray();
  movies
    ? res.status(200).send(movies)
    : res.status(404).send({ message: "Movie not found" });
});

app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await client.db("B33WD").collection("movies").findOne({ id });
  movie
    ? res.status(200).send(movie)
    : res.status(404).send({ message: "Movie not found" });
});

app.post("/movies", async (req, res) => {
  const data = req.body;
  const result = await client.db("B33WD").collection("movies").insertMany(data);
  res.send(result);
});

app.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const movie = await client
    .db("B33WD")
    .collection("movies")
    .updateOne({ id }, { $set: data });
  movie
    ? res.status(200).send(movie)
    : res.status(404).send({ message: "Movie not found" });
});

app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await client.db("B33WD").collection("movies").deleteOne({ id });
  movie.deletedCount > 0
    ? res.status(200).send(movie)
    : res.status(404).send({ message: "Movie not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT 5000");
});
