const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs").promises;

app.set("view engine", "ejs");
app.set("views", "./pages");

app.use(express.urlencoded({ extended: true }));

const fruitList = [
  "papaya",
  "guava",
  "lychee",
  "passion fruit",
  "dragon fruit",
  "jackfruit",
  "star fruit",
  "rambutan",
  "durian",
  "acerola",
];

app.get("/", (req, res) => {
  res.sendFile("pages/home.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("pages/contact.html", { root: __dirname });
});

app.get("/add-fruit", (req, res) => {
  res.sendFile("pages/add-fruit.html", { root: __dirname });
});

app.post("/contact", async (req, res) => {
  const complaintText = req.body.complaint + "\n";
  await fs.appendFile("complaint.txt", complaintText);
  res.redirect("/contact");
});

app.post("/add-fruit", (req, res) => {
  const newFruit = req.body.fruit;
  fruitList.push(newFruit);
  res.redirect("/list");
});

app.get("/list", async (req, res) => {
  // FIX 2: Changed "fruits" to "list" to match your ejs file name
  res.render("list", { fruitList });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
