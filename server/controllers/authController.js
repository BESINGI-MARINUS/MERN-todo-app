const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");

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
    const url = `${req.protocol}://${req.get("host")}/me`;
    await new Email(user, url).sendWelcome();

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

  if (!email || !password)
    return next(new AppError("Please provide email and password!", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
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

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({ status: "success" });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne(req.body);

  if (!user) return next(new AppError("No user found with this email", 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const url = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
  try {
    await new Email(user, url).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Password reset token sent to your email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res
      .status(500)
      .json({ status: "fail", message: "Error sending password reset email." });
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const token = req.params.resetToken;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // 1. Get User from DB based on the token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user)
    return next(new AppError("Password Reset token invalid or has expired."));

  // 2. If there's a user and token hasn't expired, set new password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  // 3. Update the user's changedPasswordAt field using a pre-save hook
  // 4. Login the user
  createSendToken(user, req, res, 201);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2. Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError("Your current password is wrong.", 401));

  // 3. If so, update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  // 4. Log user in, send JWT
  createSendToken(user, req, res, 200);
});
