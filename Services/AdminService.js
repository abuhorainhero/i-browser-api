const adminModel = require("../Models/AdminModel");

const admin_create = (info) => {
  return adminModel.create(info);
};

const admin_get_all = () => {
  return adminModel.find({});
};

const admin_get_one = (id) => {
  return adminModel.findOne({ _id: id });
};

const admin_update = (id, info) => {
  return adminModel.updateOne({ _id: id }, info, { new: true });
};

const admin_delete = (id) => {
  return adminModel.deleteOne({ _id: id });
};


const findAdminByEmail = (email) => {
  return adminModel.findOne({ email: email });
}


module.exports = {
  admin_create,
  admin_get_all,
  admin_get_one,
  admin_update,
  admin_delete,
  findAdminByEmail
};
