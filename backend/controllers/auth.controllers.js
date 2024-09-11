const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const JwtServices = require("../services/jwtServices");
const RefreshToken = require("../models/token.model");

const authController = {
  async signup(req, res) {
    const {
      fullName,
      username,
      password,
      confirmPassword,
      gender,
      profilePic,
    } = req.body;

    try {
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords don't match" });
      }
      const user = await User.findOne({ username });

      if (user) {
        return res.status(400).json({ error: "Username already exists" });
      }
    } catch (error) {
      return error;
    }

    // PASSWORD HASH
    const hashedPassword = await bcrypt.hash(password, 10);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    let accessToken;
    let refreshToken;
    let user;
    try {
      const userToRegister = new User({
        fullName,
        username,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        password: hashedPassword,
      });

      user = await userToRegister.save();

      // GENERATING TOKEN
      accessToken = JwtServices.signAccessToken({ _id: user._id }, "30m");

      refreshToken = JwtServices.signRefreshToken({ _id: user._id }, "60m");
    } catch (error) {
      return error;
    }

    // STORE REFRESH TOKEN IN DB
    await JwtServices.storeRefreshToken(refreshToken, user._id);

    // SEND TOKEN IN COOKIES
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    // SENDING RESPONSE
    return res.status(201).json({ user, auth: true });
  },

  // USER LOGIN CONTROLLER
  async login(req, res) {
    const { username, password } = req.body;

    let user;

    try {
      // MATCH USERNAME
      user = await User.findOne({ username: username });

      if (!user) {
        return res.status(401).send("Invalid Username");
      }

      // MATCH PASSWORD
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ message: "Invalid password" });
      }
    } catch (error) {
      return error;
    }

    const accessToken = JwtServices.signAccessToken({ _id: user._id }, "30m");
    const refreshToken = JwtServices.signRefreshToken({ _id: user._id }, "60m");

    // UPDATE REFRESH TOKEN IN DATABASE

    try {
      await RefreshToken.updateOne(
        {
          _id: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return error;
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return res.status(200).json({ user, auth: true });
  },

  // LOG OUT CONTROLLER

  async logout(req, res) {
    // DELETE REFRESH TOKEN FROM DATABASE
    const { refreshToken } = req.cookies;

    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return error;
    }

    // DELETE COOKIES
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    // RESPONSE
    res.status(200).json({ user: null });
  },

  // REFRESH CONTROLLER

  async refresh(req, res, next) {
    // GET REFRESH TOKEN FROM COOKIES
    const originalRefreshToken = req.cookies.refreshToken;

    let id;

    // VERIFY REFRESH TOKEN
    try {
      id = JwtServices.verifyRefreshToken(originalRefreshToken)._id;
    } catch (e) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };

      return next(error);
    }

    try {
      const match = RefreshToken.findOne({
        _id: id,
        token: originalRefreshToken,
      });

      if (!match) {
        const error = {
          status: 401,
          message: "Unauthorized",
        };

        return next(error);
      }
    } catch (e) {
      return next(e);
    }

    // GENERATE NEW TOKENS
    try {
      const accessToken = JwtServices.signAccessToken({ _id: id }, "30m");

      const refreshToken = JwtServices.signRefreshToken({ _id: id }, "60m");

      // UPDATING DATABASE AND SENDING RESPONSE

      await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
    } catch (e) {
      return next(e);
    }

    const user = await User.findOne({ _id: id });

    return res.status(200).json({ user, auth: true });
  },
};

module.exports = authController;
