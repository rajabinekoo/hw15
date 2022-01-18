const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://mohammadalirajab:efftoreff@cluster0.qzbjy.mongodb.net/testtest")
  .then(() => console.log("mongodb connected successfully."))
  .catch((err) => console.log(err));
