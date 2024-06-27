const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserDict = (token, user) => {
  return {
    token,
    username: user.username,
    userId: user._id,
    isAdmin: user.isAdmin,
    user: user,
  };
};

const buildToken = (user) => {
  return {
    userId: user._id,
    isAdmin: user.isAdmin,
  };
};

const register = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;

    // Check if all input is provided
    if (!(username && email && password)) {
      throw new Error("All input required");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      throw new Error("Email already exists");
    }

    // Check if the username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // Create the new user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      image,
    });

    // Generate the JWT token
    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);

    return res.status(200).json(getUserDict(token, user));
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      throw new Error("All input required");
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User with this email does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);
    return res.json(getUserDict(token, user));
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };