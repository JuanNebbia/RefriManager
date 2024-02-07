import express, { urlencoded } from "express";
import apiRouter from "./routes/app.router.js";
import { connect } from "./configurations/db.config.js";

const app = express();
const PORT = 8080;

(async () => await connect())();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(PORT, () => console.log("server up and running on port ", PORT));
