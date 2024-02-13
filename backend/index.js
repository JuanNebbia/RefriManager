import express, { urlencoded } from "express";
import apiRouter from "./src/routes/app.router.js";
import { connect } from "./src/configurations/db.config.js";
import cors from "cors";
import corsOptions from "./src/configurations/cors.config.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;

(async () => await connect())();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api", apiRouter);

app.listen(PORT, () => console.log("server up and running on port ", PORT));
