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
    const otherRevenueSiteUp = await otherRevenueSite_update(id, info);
    if (!otherRevenueSiteUp) {
      return res.status(401).json({
        error: true,
        otherRevenueSite: null,
        message: "otherRevenueSite update successfully",
      })
    }

    const otherRevenueSite = await otherRevenueSite_get_one(id);
    const otherRevenueSiteObj = JSON.parse(JSON.stringify(otherRevenueSite));

    return res.status(200).json({
      error: false,
      otherRevenueSite: otherRevenueSiteObj,
      message: "otherRevenueSite update successfully",
    });

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
    const otherRevenueSiteDel = await otherRevenueSite_delete(id);
    if (!otherRevenueSiteDel) {
      return res.status(400).json({
        error: true,
        otherRevenueSite: null,
        message: "Other Revenue Site not deleted!"
      })
    }
    const otherRevenueSite = await otherRevenueSite_get_one(id);
    const otherRevenueSiteObj = JSON.parse(JSON.stringify(otherRevenueSite));

    return res.status(200).json({
      error: false,
      otherRevenueSite: otherRevenueSiteObj,
      message: "otherRevenueSite delete successfully",
    });
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
