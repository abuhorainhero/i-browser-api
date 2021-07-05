const {
  viewedAds_create,
  viewedAds_get_all,
  viewedAds_get_one,
  viewedAds_update,
  viewedAds_delete,
} = require("../Services/ViewedAdsService");

const { user_get_one, user_update } = require("../Services/UserService")
const { ads_get_one } = require("../Services/AdsService")

const viewedAdsCreate = async (req, res, next) => {
  try {
    const { adsId, userId } = req.body;

    const ads = await ads_get_one(adsId);
    const user = await user_get_one(userId);
    console.log(ads, user)

    const userUp = await user_update(userId, { walletAmount: user.walletAmount + ads.revenue, totalAdsViewed: user.totalAdsViewed + 1 })

    if (!userUp) {
      return res.status(400).json({
        error: true,
        viewedAds: null,
        message: "viewedAds not created, something want wrong!",
      });
    }

    const viewedAds = await viewedAds_create(req.body);
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
    //console.log(id);
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
    const viewedAdsUp = await viewedAds_update(id, info);
    if (!viewedAdsUp) {
      return res.status(400).json({
        error: true,
        viewedAds: null,
        message: "viewedAds not Updated.!"
      })
    }
    const viewedAds = await viewedAds_get_one(id);
    const viewedAdsObj = JSON.parse(JSON.stringify(viewedAds));

    return res.status(200).json({
      error: false,
      viewedAds: viewedAdsObj,
      message: "viewedAds update successfully",
    });
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
    const viewedAdsDel = await viewedAds_delete(id);
    if (!viewedAdsDel) {
      return res.status(400).json({
        error: true,
        viewedAds: null,
        message: "viewedAds not deleted.!"
      })
    }
    const viewedAds = await viewedAds_get_one(id);
    const viewedAdsObj = JSON.parse(JSON.stringify(viewedAds));
    return res.status(200).json({
      error: false,
      viewedAds: viewedAdsObj,
      message: "viewedAds delete successfully",
    });
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
