const {
    viewedAds_create,
    viewedAds_get_all,
    viewedAds_get_one,
    viewedAds_update,
    viewedAds_delete,
  } = require("../Services/ViewedAdsService");
  
  const viewedAdsCreate = async (req, res, next) => {
    try {
      const info = req.body;
      console.log(info);
      const viewedAds = await viewedAds_create(info);
      const viewedAdsObj = JSON.parse(JSON.stringify(viewedAds));
  
      return res.status(200).json({
        error: false,
        viewedAds: viewedAdsObj,
        message: "viewedAds created",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        viewedAds: null,
        message: "viewedAds not created.!",
      });
    }
  };
  
  const viewedAdsGetAll = async (req, res, next) => {
    try {
      const viewedAds = await viewedAds_get_all();
      const viewedAdsObj = JSON.parse(JSON.stringify(viewedAds));
  
      return res.status(200).json({
        error: false,
        viewedAds: viewedAdsObj,
        message: "viewedAds's get successfully.!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        viewedAds: null,
        message: "viewedAds not get.!",
      });
    }
  };
  
  const viewedAdsGetOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const viewedAds = await viewedAds_get_one(id);
      const viewedAdsObj = JSON.parse(JSON.stringify(viewedAds));
  
      return res.status(200).json({
        error: false,
        viewedAds: viewedAdsObj,
        message: "viewedAds get one",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        viewedAds: null,
        message: "viewedAds not get.!",
      });
    }
  };
  
  const viewedAdsUpdate = async (req, res, next) => {
    try {
      const info = req.body;
      const { id } = req.params;
      console.log(id, info);
      const viewedAds = await viewedAds_update(id, info);
      const viewedAdsObj = JSON.parse(JSON.stringify(viewedAds));
  
      if (viewedAdsObj.ok) {
        return res.status(200).json({
          error: false,
          viewedAds: viewedAdsObj,
          message: "viewedAds update successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        viewedAds: null,
        message: "viewedAds not updated.!",
      });
    }
  };
  
  const viewedAdsDelete = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const viewedAds = await viewedAds_delete(id);
      const viewedAdsObj = JSON.parse(JSON.stringify(viewedAds));
  
      if (viewedAdsObj.ok) {
        return res.status(200).json({
          error: false,
          viewedAds: viewedAdsObj,
          message: "viewedAds delete successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        viewedAds: null,
        message: "viewedAds not deleted.!",
      });
    }
  };
  
  module.exports = {
    viewedAdsCreate,
    viewedAdsGetAll,
    viewedAdsGetOne,
    viewedAdsUpdate,
    viewedAdsDelete,
  };
  