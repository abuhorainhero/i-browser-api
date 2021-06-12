const userModel = require("../Models/UserModel");

const user_create = (info) => {
  return userModel.create(info);
};

const user_get_all = () => {
  return userModel.find({});
};

const user_get_one = (id) => {
  return userModel.findOne({ _id: id });
};

const user_update = (id, info) => {
  return userModel.updateOne({ _id: id }, info, { new: true });
};

const user_delete = (id) => {
  return userModel.deleteOne({ _id: id });
};

module.exports = {
  user_create,
  user_get_all,
  user_get_one,
  user_update,
  user_delete,
};
