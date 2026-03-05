const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const createSendToken = require("../utils/createSendToken");
const Email = require("../utils/email");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = await User.create({ name, email, password, confirmPassword });

  // Handle email sending separately with error handling
  try {
    const info = await Email({
      to: user.email,
      subject: "Welcome to TaskMaster!",
      text: `Congratulations ${user.name}! \n You have successfully signed up to TaskMaster. \n We are excited to have you on board!`,
    });
    console.log(info);
    // Send token first before responding to the client, since email sending is not critical for signup success
    createSendToken(user, req, res, 201);
  } catch (emailError) {
    // Log the email error but don't respond since response already sent
    console.error("Email sending failed:", emailError.message);
    return next(
      new AppError(`Email sending failed ${emailError.message}`, 500),
    );
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctpassword(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  createSendToken(user, req, res, 200);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1. Get Token and verify if it exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }
  // 2. Verify if token was tempered with or if it has expired.
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exist
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401,
      ),
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = user;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };
