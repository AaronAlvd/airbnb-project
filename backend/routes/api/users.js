const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  // check('password')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 6 })
  //   .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a first name with at least 2 characters.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a last name with at least 2 characters.'),
  handleValidationErrors
];

const router = express.Router();

router.post('/', validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;
  console.log(req.body)

  try {
    // Check if email or username already exists by manually querying both conditions
    const existingEmail = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({ where: { username } });

    if (existingEmail || existingUsername) {
      const err = new Error('Email or username already exists');
      err.status = 500;
      err.errors = { email: 'Email or username already exists' };
      return next(err);
    }

    // Hash password and create user
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      hashedPassword
    });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    // Set token cookie and log in user
    await setTokenCookie(res, safeUser);

    return res.status(201).json({
      user: safeUser
    });
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
