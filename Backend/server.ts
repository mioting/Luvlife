import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";

import Knex from "knex";
import knexConfig from "./knexfile";
import fs from "fs";
import { logger } from "./utils/logger";

//////////////////////////// setup ////////////////////////////
export const knex = Knex(knexConfig[process.env.NODE_ENV ?? "development"]);

const app = express();
app.use(express.json());

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

// imageUploadDir
const ImageuploadDir = "uploads/image";
fs.mkdirSync(ImageuploadDir, { recursive: true });

const VoiceuploadDir = "uploads/audio";
fs.mkdirSync(VoiceuploadDir, { recursive: true });

app.use((req, res, next) => {
  logger.debug(`Path: ${req.path},,, Method: ${req.method}`);
  next();
});

import { routes } from "./routes";
app.use(routes);

////////////////////////// statics ////////////////////////////
app.use(express.static(path.join(__dirname, "uploads", "image")));
app.use(express.static(path.join(__dirname, "uploads", "audio")));

// 404 Not Found
app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

//////////////////////////// listening port ////////////////////////////
const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => logger.info(`App running on http://localhost:${PORT}`));
