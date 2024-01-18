const { User, Thought } = require('../models');

module.exports = {
  //get all users
  async getUser(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // find user by id and update
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: req.body },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user found by that Id",
        });
      }

      res.json("User updated!");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that Id" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friends } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user with that Id",
        });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete friend
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndDelete(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user with that Id",
        });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};


// /api/users/:userId/friends/:friendId
// post add new friend to user's friend list
// delete to remove a friend from user list