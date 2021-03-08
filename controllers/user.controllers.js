const User = require('../services/user.services');
const NewUser = require('../models/user');

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

exports.getUsers = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await User.getUsers(request.query));
  });
};

exports.getUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await User.getUser(request.params.ssn);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};
exports.PostUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new NewUser(request.body).save();
    response.sendStatus(201);
  });
};

exports.deleteUsers = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteUsers(request.query)).deletedCount > 0 ? 200 : 404);
  });
};

exports.deleteUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await User.deleteUser({
      ssn: request.params.ssn,
    })).deletedCount > 0 ? 200 : 404);
  });
};

exports.putUser = async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  user.ssn = ssn;
  await doActionThatMightFailValidation(request, response, async () => {
    await User.putUser({ ssn: request.params.ssn }, user, {
      upsert: true,
    });
    response.sendStatus(200);
  });
};

exports.patchUser = async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  delete user.sku;
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await User
      .patchUser({ ssn }, user, {
        new: true,
      });
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};
