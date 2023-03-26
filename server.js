require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected"))
  .catch(() => console.log("Not Connected"));

app.use(express.json());
app.set("search-engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/api/submit-form", async (req, res) => {
  const newUser = new User(req.body);
  const user = await newUser.save();
  console.log("User saved to db: ", user);

  res.send({ message: "Form submitted successfully!" });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
