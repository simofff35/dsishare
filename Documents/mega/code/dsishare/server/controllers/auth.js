const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user.js");

// Register user
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath, friends } =
      req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new user({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ erorr: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await user.findOne({ email: email });
    if (!userFound)
      return res.status(400).json({ msg: "User cannot be found." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ msg: "Your email or password is not correct." });
    const jwt = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ erorr: err.message });
  }
};
