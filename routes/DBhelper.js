import { client } from "../index.js";

export async function deleteById(id) {
  return await client.db("B33WD").collection("movies").deleteOne({ id });
}
export async function updateMoviesById(id, data) {
  return await client
    .db("B33WD")
    .collection("movies")
    .updateOne({ id }, { $set: data });
}
export async function createMovies(data) {
  return await client.db("B33WD").collection("movies").insertMany(data);
}
export async function getMoviesById(id) {
  return await client.db("B33WD").collection("movies").findOne({ id });
}
export async function getAllMovies() {
  return await client.db("B33WD").collection("movies").find().toArray();
}
