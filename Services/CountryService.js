const countryModel = require("../Models/CountryModel");

const country_create = (info) => {
  return countryModel.create(info);
};

const country_get_all = () => {
  return countryModel.find({});
};

const country_get_one = (id) => {
  return countryModel.findOne({ _id: id });
};

const country_update = (id, info) => {
  return countryModel.updateOne({ _id: id }, info, { new: true });
};

const country_delete = (id) => {
  return countryModel.deleteOne({ _id: id });
};

module.exports = {
  country_create,
  country_get_all,
  country_get_one,
  country_update,
  country_delete,
};
