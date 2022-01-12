const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("mongodb connected successfully."))
  .catch((err) => console.log(err));
