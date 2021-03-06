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
    //console.log(info);
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

const adsGetLimit = async (req, res, next) => {
  try {
    const { start } = req.params;
    const ads = await ads_get_all();
    const adsObj = JSON.parse(JSON.stringify(ads));
    adsObj.reverse();
    return res.status(200).json({
      error: false,
      ads: adsObj.slice(start, start + 20),
      message: "Ads's get limit successfully.!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      ads: null,
      message: "ads not get.!",
    });
  }
}

const adsGetOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    //console.log(id);
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
    //console.log(id, info);
    const adsUp = await ads_update(id, info);
    if (!adsUp) {
      return res.status(400).json({
        error: true,
        ads: null,
        message: "ads not update.!"
      })
    }
    const ads = await ads_get_one(id);
    const adsObj = JSON.parse(JSON.stringify(ads));

    return res.status(200).json({
      error: false,
      ads: adsObj,
      message: "ads update successfully",
    });
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
    //console.log(id);
    const adsDel = await ads_delete(id);
    if (!adsDel) {
      return res.status(400).json({
        error: true,
        ads: null,
        message: "Ads not deleted!",
      })
    }

    const ads = await ads_get_one(id)
    const adsObj = JSON.parse(JSON.stringify(ads));


    return res.status(200).json({
      error: false,
      ads: adsObj,
      message: "ads delete successfully",
    });

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
  adsGetLimit,
  adsGetOne,
  adsUpdate,
  adsDelete,
};
