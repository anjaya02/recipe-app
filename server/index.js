import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./db.js";
import { config } from "./config.js";
import authRoutes from "./routes/auth.routes.js";
import recipeRoutes from "./routes/recipe.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import { notFound, errorHandler } from "./middleware/errors.js";

await connectDB();

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: config.clientOrigin, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 60_000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === "OPTIONS",
  })
);

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => console.log(`API on :${config.port}`));
