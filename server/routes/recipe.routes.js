import express from "express";
import Joi from "joi";
import {
  getCategories,
  getByCategory,
  searchByName,
  getMeal,
} from "../services/mealdb.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/categories", async (_, res, next) => {
  try {
    res.json(await getCategories());
  } catch (e) {
    next(e);
  }
});

router.get(
  "/by-category",
  validate(Joi.object({ c: Joi.string().required() })),
  async (req, res, next) => {
    try {
      res.json(await getByCategory(req.query.c));
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/search",
  validate(Joi.object({ q: Joi.string().required() })),
  async (req, res, next) => {
    try {
      res.json(await searchByName(req.query.q));
    } catch (e) {
      next(e);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    res.json(await getMeal(req.params.id));
  } catch (e) {
    next(e);
  }
});

export default router;
