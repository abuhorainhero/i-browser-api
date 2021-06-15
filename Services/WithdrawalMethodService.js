const withdrawalMethodModel = require("../Models/WithdrawalMethodModel");

const withdrawalMethod_create = (info) => {
  return withdrawalMethodModel.create(info);
};

const withdrawalMethod_get_all = () => {
  return withdrawalMethodModel.find({});
};

const withdrawalMethod_get_one = (id) => {
  return withdrawalMethodModel.findOne({ _id: id });
};

const withdrawalMethod_update = (id, info) => {
  return withdrawalMethodModel.updateOne({ _id: id }, info, { new: true });
};

const withdrawalMethod_delete = (id) => {
  return withdrawalMethodModel.deleteOne({ _id: id });
};

module.exports = {
  withdrawalMethod_create,
  withdrawalMethod_get_all,
  withdrawalMethod_get_one,
  withdrawalMethod_update,
  withdrawalMethod_delete,
};
