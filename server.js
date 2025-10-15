//This will make request to the API, So this is server side 
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
const API_URL = `http://localhost:${process.env.PORT ? parseInt(process.env.PORT) + 1 : 4000}`;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    // console.log(response);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "Add New Employee", submit: "Add Employee" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    // console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Employee Details",
      submit: "Update Details",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    // console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Route for searching user 
app.post("/search", async (req, res) => {
  const findEmployee = req.body.search;
  try {
        const response = await axios.post(`${API_URL}/search/employee`,  req.body);
        res.render("index.ejs", {posts: response.data});
    } catch (error) {
        console.error("Error during search operation:", error);
        res.status(500).json({ message: "Error performing search" });
    }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  console.log("called by uzair");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${parseInt(req.params.id)}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
