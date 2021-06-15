const withdrawalRequestModel = require("../Models/WithdrawalRequestModel");

const withdrawalRequest_create = (info) => {
  return withdrawalRequestModel.create(info);
};

const withdrawalRequest_get_all = () => {
  return withdrawalRequestModel.find({});
};

const withdrawalRequest_get_one = (id) => {
  return withdrawalRequestModel.findOne({ _id: id });
};

const withdrawalRequest_update = (id, info) => {
  return withdrawalRequestModel.updateOne({ _id: id }, info, { new: true });
};

const withdrawalRequest_delete = (id) => {
  return withdrawalRequestModel.deleteOne({ _id: id });
};

module.exports = {
  withdrawalRequest_create,
  withdrawalRequest_get_all,
  withdrawalRequest_get_one,
  withdrawalRequest_update,
  withdrawalRequest_delete,
};
