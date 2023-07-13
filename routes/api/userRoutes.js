const router = require('express').Router();
// api user routes
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
  updateUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
