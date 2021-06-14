const bookmarkModel = require("../Models/BookmarkModel");

const bookmark_create = (info) => {
  return bookmarkModel.create(info);
};

const bookmark_get_all = () => {
  return bookmarkModel.find({});
};

const bookmark_get_one = (id) => {
  return bookmarkModel.findOne({ _id: id });
};

const bookmark_update = (id, info) => {
  return bookmarkModel.updateOne({ _id: id }, info, { new: true });
};

const bookmark_delete = (id) => {
  return bookmarkModel.deleteOne({ _id: id });
};

module.exports = {
  bookmark_create,
  bookmark_get_all,
  bookmark_get_one,
  bookmark_update,
  bookmark_delete,
};
