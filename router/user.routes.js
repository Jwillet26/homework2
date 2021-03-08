const express = require('express');

const UserController = require('../controllers/user.controllers');

const router = express.Router();

router.get('/users', UserController.getUsers);
router.get('/users/:ssn', UserController.getUser);
router.post('/users', UserController.PostUser);
router.delete('/users/:ssn', UserController.deleteUser);
router.delete('/users', UserController.deleteUsers);
router.put('/users/:ssn', UserController.putUser);
router.patch('/users/:ssn', UserController.patchUser);

module.exports = router;
