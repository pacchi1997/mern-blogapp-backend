const express = require("express");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
require("./config/db");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5001;

app.get("/api", (req, res) => {
  res.send("hello");
})

app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res, next) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}...`);
});
