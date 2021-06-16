const viewedAdsModel = require("../Models/ViewedAdsModel");

const viewedAds_create = (info) => {
  return viewedAdsModel.create(info);
};

const viewedAds_get_all = () => {
  return viewedAdsModel.find({});
};

const viewedAds_get_one = (id) => {
  return viewedAdsModel.findOne({ _id: id });
};

const viewedAds_update = (id, info) => {
  return viewedAdsModel.updateOne({ _id: id }, info, { new: true });
};

const viewedAds_delete = (id) => {
  return viewedAdsModel.deleteOne({ _id: id });
};

module.exports = {
  viewedAds_create,
  viewedAds_get_all,
  viewedAds_get_one,
  viewedAds_update,
  viewedAds_delete,
};
