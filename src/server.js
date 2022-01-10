const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

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

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando...");
});
