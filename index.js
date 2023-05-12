const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// touhidcodes
// nBSplzuYHiyDNW5t

const uri =
	"mongodb+srv://touhidcodes:nBSplzuYHiyDNW5t@cluster0.57whvd4.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// const database = client.db("usersDB");
		// const usersCollection = database.collection("users");

		const usersCollection = client.db("usersDB").collection("users");

		app.get("/users", async (req, res) => {
			const cursor = usersCollection.find();
			const result = await cursor.toArray();
			res.send(result);
		});

		app.post("/users", async (req, res) => {
			const user = req.body;
			console.log("new user", user);
			const result = await usersCollection.insertOne(user);
			res.send(result);
		});

		app.delete("/user/:id", async (req, res) => {
			const id = req.params.id;
			// console.log(id);
			const query = { _id: new ObjectId(id) };
			// console.log(query);
			const result = await usersCollection.deleteOne(query);
			res.send(result);
			// console.log(result);
		});

		// Send a ping to confirm a successful connection
	} finally {
		// Ensures that the client will close when you finish/error
		// await client.close();
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("CRUD server is running....");
});

app.listen(port, () => {
	console.log(`Simple CRUD app listening on port ${port}`);
});
