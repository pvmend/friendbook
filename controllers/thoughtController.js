const { Thought, User } = require('../models');

module.exports = {
  // get all posts
  async getPosts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single post by its _id
  async getSinglePost(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No post with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // create a new post
  async createPost(req, res) {
    try {
      const thought = await Thought.create(req.body);
      
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      )
        .select('-__v');

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Post created, but found no user with that ID' });
      }

      res.json('Created the post 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete a post by its _id
  async deletePost(req, res){
    try{
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId})
      .select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'No post with that ID' });
      }
      res.json(thought);
      console.log(`deleted ${thought}`)
    } catch (err) {
      console.log (err)
      res.status(500).json(err);
    }

  },
  // create a reaction 
  async createReaction(req, res){
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {new: true}
        )
        .select('-__v');
    
        if (!thought) {
            return res.status(404).json({ message: 'No post with that ID' });
        }
        res.json(thought);
        console.log(`added ${req.body} to ${thought}`)
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
  },
  // delete a reaction by its _id
    async deleteReaction(req, res){
        try{
        const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}})
            .select('-__v');
            if (!thought){
                return res.status(404).json({ message: 'No post with that ID' });
            }
            res.json(thought);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    }
};
