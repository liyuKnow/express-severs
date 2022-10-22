const express = require("express");
const { getAllUsers, getUser, createUser, updateUser, deleteUser, searchUser } = require("../controllers/usersController");

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.get('/search/:query', searchUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;