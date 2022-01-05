import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes.js";

const app = express();

app.use(express.json());
app.use(routes);

mongoose.connect(
  "mongodb+srv://admin:7adven2022@cluster0.cbv5j.gcp.mongodb.net/AdvenDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.listen(3333);
