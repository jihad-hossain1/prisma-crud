const express = require('express');
const {createUser, getAllUser, singleUser, updateUser, deleteUser} = require('../controllers/user.controllers')

const router = express.Router();


router.route('/create-user').post(createUser);
router.route('/all-users').get(getAllUser);
router.route('/:id').get(singleUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

module.exports = router
