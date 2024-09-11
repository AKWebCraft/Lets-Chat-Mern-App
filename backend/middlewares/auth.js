const JwtServices = require("../services/jwtServices");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = req.cookies;

    if (!refreshToken || !accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let _id;

    try {
      _id = JwtServices.verifyAccessToken(accessToken)._id;
    } catch (error) {
      return error;
    }

    let user;

    try {
      user = await User.findOne({ _id: _id });
    } catch (error) {
      return error;
    }
    req.user = user;

    next();
  } catch (error) {
    return error;
  }
};

module.exports = auth;
