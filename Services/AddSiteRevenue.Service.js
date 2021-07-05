const addSiteRevenueModel = require("../Models/AddSiteRevenue.Model");

const addSiteRevenue_create = (info) => {
    return addSiteRevenueModel.create(info);
};

const addSiteRevenue_get_all = () => {
    return addSiteRevenueModel.find({});
};

const addSiteRevenue_get_one = (id) => {
    return addSiteRevenueModel.findOne({ _id: id });
};

const addSiteRevenue_update = (id, info) => {
    return addSiteRevenueModel.updateOne({ _id: id }, info, { new: true });
};

const addSiteRevenue_delete = (id) => {
    return addSiteRevenueModel.deleteOne({ _id: id });
};

module.exports = {
    addSiteRevenue_create,
    addSiteRevenue_get_all,
    addSiteRevenue_get_one,
    addSiteRevenue_update,
    addSiteRevenue_delete,
};
