const {
    ads_create,
    ads_get_all,
    ads_get_one,
    ads_update,
    ads_delete,
  } = require("../Services/AdsService");
  
  const adsCreate = async (req, res, next) => {
    try {
      const info = req.body;
      console.log(info);
      const ads = await ads_create(info);
      const adsObj = JSON.parse(JSON.stringify(ads));
  
      return res.status(200).json({
        error: false,
        ads: adsObj,
        message: "ads created",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        ads: null,
        message: "ads not created.!",
      });
    }
  };
  
  const adsGetAll = async (req, res, next) => {
    try {
      const ads = await ads_get_all();
      const adsObj = JSON.parse(JSON.stringify(ads));
  
      return res.status(200).json({
        error: false,
        ads: adsObj,
        message: "ads's get successfully.!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        ads: null,
        message: "ads not get.!",
      });
    }
  };
  
  const adsGetOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const ads = await ads_get_one(id);
      const adsObj = JSON.parse(JSON.stringify(ads));
  
      return res.status(200).json({
        error: false,
        ads: adsObj,
        message: "ads get one",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        ads: null,
        message: "ads not get.!",
      });
    }
  };
  
  const adsUpdate = async (req, res, next) => {
    try {
      const info = req.body;
      const { id } = req.params;
      console.log(id, info);
      const ads = await ads_update(id, info);
      const adsObj = JSON.parse(JSON.stringify(ads));
  
      if (adsObj.ok) {
        return res.status(200).json({
          error: false,
          ads: adsObj,
          message: "ads update successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        ads: null,
        message: "ads not updated.!",
      });
    }
  };
  
  const adsDelete = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const ads = await ads_delete(id);
      const adsObj = JSON.parse(JSON.stringify(ads));
  
      if (adsObj.ok) {
        return res.status(200).json({
          error: false,
          ads: adsObj,
          message: "ads delete successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        ads: null,
        message: "ads not deleted.!",
      });
    }
  };
  
  module.exports = {
    adsCreate,
    adsGetAll,
    adsGetOne,
    adsUpdate,
    adsDelete,
  };
  