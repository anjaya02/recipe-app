import express from "express";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { config } from "../config.js";
import User from "../models/User.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(72).required(),
});

function sign(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpires }
  );
}

router.post("/register", validate(authSchema), async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = sign(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none", 
      secure: true, 
      path: "/", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ id: user._id, email: user.email, token });
  } catch (e) {
    // Handle duplicate email error specifically
    if (e.code === 11000 && e.keyPattern?.email) {
      return res.status(409).json({ message: "Email already exists" });
    }
    next(e);
  }
});

router.post("/login", validate(authSchema), async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = sign(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none", 
      secure: true, 
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ id: user._id, email: user.email, token });
  } catch (e) {
    next(e);
  }
});

router.post("/logout", requireAuth, (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

router.get("/me", requireAuth, (req, res) =>
  res.json({ id: req.user.id, email: req.user.email })
);

export default router;
