const Todo = require("../models/Todo");
// Todo here is replacing the db.collection form the old code
// variables with capital letters are usually assigned to a model

module.exports = {
  getTodos: async (req, res) => {
    console.log(req.user);
    try {
      // this will run asyncrhonously and will story the info from database into todoItems
      const todoItems = await Todo.find({ userId: req.user.id });
      // count documents is a method from mongoose!
      const itemsLeft = await Todo.countDocuments({
        // lets count the documents that have the same id as the logged in user and are not marked as complete
        userId: req.user.id,
        completed: false,
      });
      // we will then get the response and pass it into our .ejs
      // render all of this to the ejs!!!!
      res.render("todos.ejs", {
        // we will send to the ejs the todos, teh number of items left and the USER
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (req, res) => {
    try {
      // we create the todo populating our model with the properties bellow
      // .create is a method from mongoose
      await Todo.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id,
      });
      // THANNNN we REDIRECT
      console.log("Todo has been added!");
      res.redirect("/todos");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Todo");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
