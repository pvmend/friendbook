const router = require('express').Router();
const { get } = require('http');
// api thought routes
const {
  getSinglePost,
  getPosts,
  createPost,
  deletePost,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getPosts).post(createPost);

router.route('/:thoughtId').get(getSinglePost).delete(deletePost).put(getSinglePost);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
