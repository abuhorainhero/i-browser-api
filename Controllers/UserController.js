const {
  user_create,
  user_get_all,
  user_get_one,
  user_update,
  user_delete,
} = require("../Services/UserService");

const userCreate = async (req, res, next) => {
  try {
    const info = req.body;
    console.log(info);
    const user = await user_create(info);
    const userObj = JSON.parse(JSON.stringify(user));

    return res.status(200).json({
      error: false,
      user: userObj,
      message: "user created",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "user not created.!",
    });
  }
};

const userGetAll = async (req, res, next) => {
  try {
    const user = await user_get_all();
    const userObj = JSON.parse(JSON.stringify(user));

    return res.status(200).json({
      error: false,
      user: userObj,
      message: "user's get successfully.!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "user not get.!",
    });
  }
};

const userGetOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await user_get_one(id);
    const userObj = JSON.parse(JSON.stringify(user));

    return res.status(200).json({
      error: false,
      user: userObj,
      message: "user get one",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "user not get.!",
    });
  }
};

const userUpdate = async (req, res, next) => {
  try {
    const info = req.body;
    const { id } = req.params;
    console.log(id, info);
    const user = await user_update(id, info);
    const userObj = JSON.parse(JSON.stringify(user));

    if (userObj.ok) {
      return res.status(200).json({
        error: false,
        user: userObj,
        message: "user update successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "user not updated.!",
    });
  }
};

const userDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await user_delete(id);
    const userObj = JSON.parse(JSON.stringify(user));

    if (userObj.ok) {
      return res.status(200).json({
        error: false,
        user: userObj,
        message: "user delete successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "user not deleted.!",
    });
  }
};

module.exports = {
  userCreate,
  userGetAll,
  userGetOne,
  userUpdate,
  userDelete,
};
