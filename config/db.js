const mongoose = require("mongoose");

mongoose.set('strictQuery', false);


mongoose
  .connect(
    ""
  )
  .then(() => {
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });