const express = require("express");
const cors = require("cors");
const app = express();
const {
  MongoClient,
  ServerApiVersion,
  TopologyDescriptionChangedEvent,
  ObjectId,
} = require("mongodb");

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trnyuya.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.get("/", async (req, res) => {
  res.send("HELLO");
});

async function run() {
  try {
    // Connecting with mongodb
    await client.connect();

    // Collections
    const userCollection = client
      .db("annoor-business")
      .collection("users-collection");

    const productCollection = client
      .db("annoor-business")
      .collection("product-collection");

    app.get("/products", async (req, res) => {
      res.send("In the product api");
    });

    app.get("/get-product", async (req, res) => {
      try {
        // const category = req.headers?.category;
        // const filter = { category: category };
        const result = await productCollection.find({}).toArray();
        res.status(200).send({
          data: result,
          success: true,
          message: "Got products data.",
        });
      } catch (error) {
        res.status(500).send({
          message: "Internal server error.",
          success: false,
        });
      }
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Responding to ${PORT}`));
