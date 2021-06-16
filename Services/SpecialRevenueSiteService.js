const specialRevenueSiteModel = require("../Models/SpecialRevenueSiteModel");

const specialRevenueSite_create = (info) => {
  return specialRevenueSiteModel.create(info);
};

const specialRevenueSite_get_all = () => {
  return specialRevenueSiteModel.find({});
};

const specialRevenueSite_get_one = (id) => {
  return specialRevenueSiteModel.findOne({ _id: id });
};

const specialRevenueSite_update = (id, info) => {
  return specialRevenueSiteModel.updateOne({ _id: id }, info, { new: true });
};

const specialRevenueSite_delete = (id) => {
  return specialRevenueSiteModel.deleteOne({ _id: id });
};

module.exports = {
  specialRevenueSite_create,
  specialRevenueSite_get_all,
  specialRevenueSite_get_one,
  specialRevenueSite_update,
  specialRevenueSite_delete,
};
