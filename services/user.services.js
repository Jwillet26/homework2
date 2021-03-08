const User = require('../models/user');

exports.getUsers = async (query) => {
  try {
    return await User.find(query).select('-_id -__v');
  } catch (e) {
    throw Error('Error while trying to get the users');
  }
};

exports.getUser = async function getUser(ssn) {
  try {
    return await User.findOne({ ssn }).select('-_id -__v');
  } catch (e) {
    throw Error('Error while trying to get the user');
  }
};

exports.PostUser = async function PostUser(body) {
  try {
    return new User(body).save();
  } catch (e) {
    throw Error('Error while trying to post a user');
  }
};

exports.deleteUsers = async function deleteUsers(query) {
  try {
    return User.deleteMany(query);
  } catch (e) {
    throw Error('Error while trying to delete the users');
  }
};
exports.deleteUser = async function deleteUser(ssn) {
  try {
    return await User.deleteOne(ssn);
  } catch (e) {
    throw Error('Error while trying to delete the users');
  }
};
exports.putUser = async function putUser(ssn, user) {
  try {
    return await User.findOneAndReplace(ssn, user, { upsert: true });
  } catch (e) {
    throw Error('Error while trying to update the user');
  }
};
exports.patchUser = async function patchUser(ssn, user) {
  try {
    return User.findOneAndUpdate(ssn, user, { new: true }).select('-_id -__v');
  } catch (e) {
    throw Error('Error while trying to update the user');
  }
};
