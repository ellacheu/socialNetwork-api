const { User, Thought } = require('../models');

module.exports = {
  //find all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //find single thought
  async getSingleThought(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtsId });
      const reactionCount = thought.reactionCount;
      console.log(`Number of reactions: ${reactionCount}`);

      if (!thoughts) {
        return res.json(404).json({
          message: "No thought found with that Id",
        });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create new thought
  async createThought(req, res) {
    try {
      const thoughts = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughts._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user found with that Id",
        });
      }

      res.json("Created new thought!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update thought
  async updateThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: req.body },
        { new: true }
      );

      if (!thoughts) {
        res.status(404).json({
          message: "No thought found with that Id",
        });
      }

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete thought
  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thoughts) {
        res.status(404).json({
          message: "No thought found with that Id",
        });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user found with that Id",
        });
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create reaction
  async createReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!thoughts) {
        return res.status(404)({
          message: "No thought found with that Id",
        });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // delete a reaction
  async deleteReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } }
      );

      if (!thoughts) {
        return res.status(404).json({
          message: "No thought found with that Id",
        });
      }

      res.json({ message: "Reaction has been successfully created!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};


// /api/thoughts/:thoughtId/reactions\
// post to create reaction stored in a single thought reactions array field
// delete to pull and remove reaction by reactionId value