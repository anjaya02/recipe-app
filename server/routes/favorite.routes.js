import express from "express";
import Joi from "joi";
import Favorite from "../models/Favorite.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const items = await Favorite.find({ userId: req.user.id }).sort(
      "-createdAt"
    );
    res.json(items);
  } catch (e) {
    next(e);
  }
});

router.post(
  "/",
  validate(
    Joi.object({
      mealId: Joi.string().required(),
      mealName: Joi.string().required(),
      mealThumb: Joi.string().uri().allow("", null),
    })
  ),
  async (req, res, next) => {
    try {
      const fav = await Favorite.create({ ...req.body, userId: req.user.id });
      res.status(201).json(fav);
    } catch (e) {
      if (e.code === 11000) {
        return res.status(409).json({ message: "Meal already in favorites" });
      }
      next(e);
    }
  }
);

router.delete("/:mealId", async (req, res, next) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.user.id,
      mealId: req.params.mealId,
    });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

export default router;
