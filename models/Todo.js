const mongoose = require("mongoose");
// we are now using mongoose instead of mongoDb client. mongoose provides us a schema!!! teh schema gives us a structure for our data!

// every siingle todo that we make will have a todo property, a completed property and a userId!
// i now know how to create my ejs -- because I know what properties I have to display/ work with!!!

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
