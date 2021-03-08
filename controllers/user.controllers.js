const User = require('../services/user.services');
// const Error = require('./validationError');
const NewUser = require('../models/user');

/*
exports.getUsers = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await User.getUsers(request.query).select('-_id -__v'));
  });
};
*/
exports.getUsers = async (req, res) => {
  // Validate request parameters, queries using express-validator
  try {
    const users = await User.getUsers({});
    return res.status(200).json({ status: 200, data: users, message: 'Successful Users Retrieved' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.getUser = async (request, response) => {
  try {
    const getResult = await User.getUser({ ssn: request.params.ssn });
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  } catch (e) {
    response.status(500);
  }
};
exports.PostUser = async (request, response) => {
  try {
    const newUser = await new NewUser(request.body).save();
    return response.status(201).json({ status: 201, data: newUser, message: 'User created successfully' });
  } catch (e) {
    return response.status(500).json({ status: 500, message: e.message });
  }
};

exports.deleteUsers = async (request, response) => {
  try {
    await User.deleteUsers(request.query);
    return response.status(200).json({ status: 200 });
  } catch (e) {
    return response.status(500).json({ status: 500 });
  }
};

exports.deleteUser = async (request, response) => {
  try {
    await User.deleteUser({ ssn: request.params.ssn });
    return response.status(200).json({ status: 200 });
  } catch (e) {
    return response.status(500).json({ status: 500 });
  }
};

exports.putUser = async (request, response) => {
  try {
    const { ssn } = request.params;
    const user = request.body;
    user.ssn = ssn;
    await User.putUser({ ssn: request.params.ssn }, user);
    response.sendStatus(200);
  } catch (e) {
    response.sendStatus(500);
  }
};

exports.patchUser = async (request, response) => {
  try {
    const { ssn } = request.params;
    const user = request.body;
    delete user.ssn;
    const patchResult = await User.patchUser({ ssn }, user, { new: true });
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  } catch (e) {
    response.sendStatus(500);
  }
};
