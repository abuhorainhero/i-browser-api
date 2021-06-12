const cityModel = require("../Models/CityModel");

const city_create = (info) => {
  return cityModel.create(info);
};

const city_get_all = () => {
  return cityModel.find({});
};

const city_get_one = (id) => {
  return cityModel.findOne({ _id: id });
};

const city_update = (id, info) => {
  return cityModel.updateOne({ _id: id }, info, { new: true });
};

const city_delete = (id) => {
  return cityModel.deleteOne({ _id: id });
};

module.exports = {
  city_create,
  city_get_all,
  city_get_one,
  city_update,
  city_delete,
};
