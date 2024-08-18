require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lnhug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const skillCollection = client.db('portfolioDB').collection('skills');
    const projectCollection = client.db('portfolioDB').collection('projects');
    const certificateCollection = client.db('portfolioDB').collection('certificates');
    const blogCollection = client.db('portfolioDB').collection('blogs');

    // Get all skills
    app.get('/skill', async (req, res) => {
      const cursor = skillCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get all projects
    app.get('/project', async (req, res) => {
      const cursor = projectCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get all certificates
    app.get('/certificate', async (req, res) => {
      const cursor = certificateCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get all certificates
    app.get('/blog', async (req, res) => {
      const cursor = blogCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // If you close the client here, you won't be able to handle incoming requests
    // You might want to move `await client.close();` outside of the `finally` block
    // or handle the closing of the client elsewhere.
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Portfolio server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
