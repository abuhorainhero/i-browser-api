const newsModel = require("../Models/NewsModel");

const news_create = (info) => {
  return newsModel.create(info);
};

const news_get_all = () => {
  return newsModel.find({});
};

const news_get_one = (id) => {
  return newsModel.findOne({ _id: id });
};

const news_update = (id, info) => {
  return newsModel.updateOne({ _id: id }, info, { new: true });
};

const news_delete = (id) => {
  return newsModel.deleteOne({ _id: id });
};

module.exports = {
  news_create,
  news_get_all,
  news_get_one,
  news_update,
  news_delete,
};
