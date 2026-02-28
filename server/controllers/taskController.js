const Task = require("../models/taskModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json({
    success: true,
    results: tasks.length,
    data: {
      tasks,
    },
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const { description, category, completed, important } = req.body;

  const task = await Task.create({
    description,
    category,
    completed,
    important,
  });
  if (!task) return next(new AppError("Failed to create task", 400));

  res.status(201).json({
    success: true,
    data: {
      task,
    },
  });
});

// get a single task by id
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new AppError("No task found with that ID", 404));

  res.status(200).json({
    success: true,
    data: {
      task,
    },
  });
});

// update a task
exports.updateTask = catchAsync(async (req, res, next) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) return next(new AppError("No task found to update", 404));

  res.status(200).json({
    success: true,
    data: {
      task: updated,
    },
  });
});

// delete a task
exports.deleteTask = catchAsync(async (req, res, next) => {
  const deleted = await Task.findByIdAndDelete(req.params.id);
  if (!deleted) return next(new AppError("No task found to delete", 404));

  res.status(204).json({
    success: true,
    data: null,
  });
});
