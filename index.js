//This will handle the API request, this is actual API
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 4000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/posts", async (req, res) => {
    const posts = await db.query("SELECT * FROM Employee");
    res.send(posts.rows);
});

app.get("/posts/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Employee WHERE id = $1", [req.params.id]);
    if (result.rows.length > 0) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching employee" });
  }
});

app.post("/search/employee", async (req, res) => {
    const searchTerm = req.body.search;
    const searchPattern = `%${searchTerm}%`;

    try {
        const posts = await db.query("SELECT * from Employee where name ILIKE $1 OR email ILIKE $1 OR position ILIKE $1;", [searchPattern]);
        res.send(posts.rows); 
    } catch (error) {
        console.error("Database search error:", error);
        res.status(500).json({ message: "Failed to perform database search." });
    }
});

app.post("/posts", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const position = req.body.position;
    const posts = await db.query("INSERT INTO Employee (name, email, position) VALUES ($1, $2, $3)", [name, email, position]);
    res.send(posts.rows); 
});

app.patch("/posts/:id", async (req, res) => {
    var id = parseInt(req.params.id);
    const name = req.body.name !== undefined ? req.body.name : null;
    const email = req.body.email !== undefined ? req.body.email : null;
    const position = req.body.position !== undefined ? req.body.position : null;
    
    try {
        const result = await db.query("UPDATE Employee SET name = COALESCE($1, name),email = COALESCE($2, email), position = COALESCE($3, position) WHERE id = $4;", [name,email,position,id]);
        if(result.rowCount > 0) {
          res.send({ message: "Employee updated successfully" });
        } else {
          res.status(404).send({ message: "Employee not found" });
        }
    } catch (error) {
        console.error("Error patching employee:", error);
        res.status(500).json({ message: "Error updating employee" });
    }
});

app.delete("/posts/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const result = await db.query("DELETE FROM Employee WHERE id = $1", [id]);
        if(result.rowCount > 0) {
            res.send({ message: "Employee deleted successfully" });
        } else {
            res.status(404).send({ message: "Employee not found" });
        }
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ message: "Error deleting employee" });
    }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});