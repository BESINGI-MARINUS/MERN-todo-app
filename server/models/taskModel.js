const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "A task must have a title"],
      minlength: [3, "A task title must have more than 3 characters"],
      maxlength: [100, "A task title must have less than 100 characters"],
    },
    category: {
      type: String,
      required: [true, "A task must have a category"],
      enum: {
        values: ["Work", "Personal", "Others", "Academic"],
        message: "Category must be either: Work, Personal, Academic, or Others",
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
    important: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
