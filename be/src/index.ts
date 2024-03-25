import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import { env } from "./config/env";
import userRoutes from "./user/index";

const app: Express = express();
const port = env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", userRoutes());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});
