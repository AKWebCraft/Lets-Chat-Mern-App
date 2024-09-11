const User = require("../models/user.model");

const userController = {
  async getAllUsers(req, res) {
    const loggedInUserId = req.user._id;
    let filteredUsers;
    try {
      filteredUsers = await User.find({
        _id: { $ne: loggedInUserId },
      }).select("-password");
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ filteredUsers });
  },
};

module.exports = userController;
