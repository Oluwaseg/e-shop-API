import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import session from "express-session";
import { errorMiddleware } from "./middlewares/error.js";

// import route
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import orderRouter from "./routes/order.js";
const app = express();

// Middleware
app.use(cors());

app.options("*", cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000, // 30 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // CSRF protection
    },
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorMiddleware);

// routes
app.use("/api/user", userRouter);
app.use("/api/", productRouter);
app.use("/api", orderRouter);

export default app;
