const adsModel = require("../Models/AdsModel");

const ads_create = (info) => {
  return adsModel.create(info);
};

const ads_get_all = () => {
  return adsModel.find({});
};

const ads_get_one = (id) => {
  return adsModel.findOne({ _id: id });
};

const ads_update = (id, info) => {
  return adsModel.updateOne({ _id: id }, info, { new: true });
};

const ads_delete = (id) => {
  return adsModel.deleteOne({ _id: id });
};

module.exports = {
  ads_create,
  ads_get_all,
  ads_get_one,
  ads_update,
  ads_delete,
};
