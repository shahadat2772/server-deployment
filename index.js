const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("HELLO");
});

app.get("/products", async (req, res) => {
  res.send("In the product api");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Responding to ${PORT}`));
