import express from "express";
import {
  getAllMovies,
  getMoviesById,
  createMovies,
  updateMoviesById,
  deleteById,
} from "../routes/DBhelper.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await getAllMovies();
  movies
    ? res.status(200).send(movies)
    : res.status(404).send({ message: "Movie not found" });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await getMoviesById(id);
  movie
    ? res.status(200).send(movie)
    : res.status(404).send({ message: "Movie not found" });
});

router.post("/", async (req, res) => {
  const data = req.body;
  const result = await createMovies(data);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const movie = await updateMoviesById(id, data);
  movie
    ? res.status(200).send(movie)
    : res.status(404).send({ message: "Movie not found" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await deleteById(id);
  movie.deletedCount > 0
    ? res.status(200).send(movie)
    : res.status(404).send({ message: "Movie not found" });
});

export const moviesRouter = router;
