const otherRevenueSiteModel = require("../Models/OtherRevenueSite.Model");

const otherRevenueSite_create = (info) => {
  return otherRevenueSiteModel.create(info);
};

const otherRevenueSite_get_all = () => {
  return otherRevenueSiteModel.find({});
};

const otherRevenueSite_get_one = (id) => {
  return otherRevenueSiteModel.findOne({ _id: id });
};

const otherRevenueSite_update = (id, info) => {
  return otherRevenueSiteModel.updateOne({ _id: id }, info, { new: true });
};

const otherRevenueSite_delete = (id) => {
  return otherRevenueSiteModel.deleteOne({ _id: id });
};

module.exports = {
  otherRevenueSite_create,
  otherRevenueSite_get_all,
  otherRevenueSite_get_one,
  otherRevenueSite_update,
  otherRevenueSite_delete,
};
