const {
    otherRevenueSite_create,
    otherRevenueSite_get_all,
    otherRevenueSite_get_one,
    otherRevenueSite_update,
    otherRevenueSite_delete,
  } = require("../Services/OtherRevenueSite.Service");
  
  const otherRevenueSiteCreate = async (req, res, next) => {
    try {
      const info = req.body;
      //console.log(info);
      const otherRevenueSite = await otherRevenueSite_create(info);
      const otherRevenueSiteObj = JSON.parse(JSON.stringify(otherRevenueSite));
  
      return res.status(200).json({
        error: false,
        otherRevenueSite: otherRevenueSiteObj,
        message: "otherRevenueSite created",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        otherRevenueSite: null,
        message: "otherRevenueSite not created.!",
      });
    }
  };
  
  const otherRevenueSiteGetAll = async (req, res, next) => {
    try {
      const otherRevenueSite = await otherRevenueSite_get_all();
      const otherRevenueSiteObj = JSON.parse(JSON.stringify(otherRevenueSite));
  
      return res.status(200).json({
        error: false,
        otherRevenueSite: otherRevenueSiteObj,
        message: "otherRevenueSite's get successfully.!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        otherRevenueSite: null,
        message: "otherRevenueSite not get.!",
      });
    }
  };
  
  const otherRevenueSiteGetOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const otherRevenueSite = await otherRevenueSite_get_one(id);
      const otherRevenueSiteObj = JSON.parse(JSON.stringify(otherRevenueSite));
  
      return res.status(200).json({
        error: false,
        otherRevenueSite: otherRevenueSiteObj,
        message: "otherRevenueSite get one",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        otherRevenueSite: null,
        message: "otherRevenueSite not get.!",
      });
    }
  };
  
  const otherRevenueSiteUpdate = async (req, res, next) => {
    try {
      const info = req.body;
      const { id } = req.params;
      //console.log(id, info);
      const otherRevenueSite = await otherRevenueSite_update(id, info);
      const otherRevenueSiteObj = JSON.parse(JSON.stringify(otherRevenueSite));
  
      if (otherRevenueSiteObj.ok) {
        return res.status(200).json({
          error: false,
          otherRevenueSite: otherRevenueSiteObj,
          message: "otherRevenueSite update successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        otherRevenueSite: null,
        message: "otherRevenueSite not updated.!",
      });
    }
  };
  
  const otherRevenueSiteDelete = async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const otherRevenueSite = await otherRevenueSite_delete(id);
      const otherRevenueSiteObj = JSON.parse(JSON.stringify(otherRevenueSite));
  
      if (otherRevenueSiteObj.ok) {
        return res.status(200).json({
          error: false,
          otherRevenueSite: otherRevenueSiteObj,
          message: "otherRevenueSite delete successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        otherRevenueSite: null,
        message: "otherRevenueSite not deleted.!",
      });
    }
  };
  
  module.exports = {
    otherRevenueSiteCreate,
    otherRevenueSiteGetAll,
    otherRevenueSiteGetOne,
    otherRevenueSiteUpdate,
    otherRevenueSiteDelete,
  };
  