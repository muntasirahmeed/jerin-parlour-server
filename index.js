const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
// ?--------------------middleware---------------//
app.use(cors());
app.use(express.json());
// ?--------------------mongoDb code---------------//

const uri =
  "mongodb+srv://admin:75BAXTmLGq3ngEPN@cluster0.ergj3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db("jerin-parlour").collection("services");
    app.get("/demo", async (req, res) => {
      const result = await serviceCollection.find().toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Jerin Parlour server in running");
});

app.listen(port, () => {
  console.log(`Jerin Parlour listening on port ${port}`);
});
