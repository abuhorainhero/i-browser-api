const interestModel = require("../Models/InterestModel");

const interest_create = (info) => {
  return interestModel.create(info);
};

const interest_get_all = () => {
  return interestModel.find({});
};

const interest_get_one = (id) => {
  return interestModel.findOne({ _id: id });
};

const interest_update = (id, info) => {
  return interestModel.updateOne({ _id: id }, info, { new: true });
};

const interest_delete = (id) => {
  return interestModel.deleteOne({ _id: id });
};

module.exports = {
  interest_create,
  interest_get_all,
  interest_get_one,
  interest_update,
  interest_delete,
};
