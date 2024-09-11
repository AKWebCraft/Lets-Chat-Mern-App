const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/token.model");

class jwtServices {
  // SIGN ACESS TOKEN
  static signAccessToken(payload, expiryTime) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: expiryTime,
    });
  }

  // SIGN REFRESH TOKEN
  static signRefreshToken(payload, expiryTime) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: expiryTime,
    });
  }

  // VERIFY ACCESS TOKEN
  static verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }

  // VERIFY REFRESH TOKEN
  static verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  }

  // STORE REFRESH TOKEN IN DATABASE
  static async storeRefreshToken(token, userId) {
    try {
      const newToken = new RefreshToken({
        token: token,
        userId: userId,
      });

      // STORE IN DB
      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = jwtServices;
