const {
  specialRevenueSite_create,
  specialRevenueSite_get_all,
  specialRevenueSite_get_one,
  specialRevenueSite_update,
  specialRevenueSite_delete,
} = require("../Services/SpecialRevenueSiteService");

const specialRevenueSiteCreate = async (req, res, next) => {
  try {
    const info = req.body;
    const file = req.file;
    const filePath = `${req.get("host")}/${file.path}`;
    const finalInfo = { ...info, icon: filePath };
    const specialRevenueSite = await specialRevenueSite_create(finalInfo);
    const specialRevenueSiteObj = JSON.parse(JSON.stringify(specialRevenueSite));

    return res.status(200).json({
      error: false,
      specialRevenueSite: specialRevenueSiteObj,
      message: "specialRevenueSite created",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      specialRevenueSite: null,
      message: "specialRevenueSite not created.!",
    });
  }
};

const specialRevenueSiteGetAll = async (req, res, next) => {
  try {
    const specialRevenueSite = await specialRevenueSite_get_all();
    const specialRevenueSiteObj = JSON.parse(JSON.stringify(specialRevenueSite));

    return res.status(200).json({
      error: false,
      specialRevenueSite: specialRevenueSiteObj,
      message: "specialRevenueSite's get successfully.!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      specialRevenueSite: null,
      message: "specialRevenueSite not get.!",
    });
  }
};

const specialRevenueSiteGetOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const specialRevenueSite = await specialRevenueSite_get_one(id);
    const specialRevenueSiteObj = JSON.parse(JSON.stringify(specialRevenueSite));

    return res.status(200).json({
      error: false,
      specialRevenueSite: specialRevenueSiteObj,
      message: "specialRevenueSite get one",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      specialRevenueSite: null,
      message: "specialRevenueSite not get.!",
    });
  }
};

const specialRevenueSiteUpdate = async (req, res, next) => {
  try {
    const info = req.body;
    const { id } = req.params;
    const file = req.file;
    const filePath = `${req.get("host")}/${file.path}`;
    const finalInfo = { ...info, icon: filePath };
    const specialRevenueSiteUp = await specialRevenueSite_update(id, finalInfo);
    console.log(specialRevenueSiteUp)
    if (!specialRevenueSiteUp) {
      return res.status(401).json({
        error: true,
        specialRevenueSite: null,
        message: "not updated!"
      })
    }

    const specialRevenueSite = await specialRevenueSite_get_one(id);
    const specialRevenueSiteObj = JSON.parse(JSON.stringify(specialRevenueSite));

    return res.status(200).json({
      error: false,
      specialRevenueSite: specialRevenueSiteObj,
      message: "specialRevenueSite update successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
      specialRevenueSite: null,
      message: "specialRevenueSite not updated.!",
    });
  }
};

const specialRevenueSiteDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const specialRevenueSiteDel = await specialRevenueSite_delete(id);
    if (!specialRevenueSiteDel) {
      return res.status(400).json({
        error: true,
        specialRevenueSite: null,
        message: "Special Revenue Site not Deleted!"
      })
    }
    const specialRevenueSite = await specialRevenueSite_get_one(id);
    const specialRevenueSiteObj = JSON.parse(JSON.stringify(specialRevenueSite));
    return res.status(200).json({
      error: false,
      specialRevenueSite: specialRevenueSiteObj,
      message: "specialRevenueSite delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      specialRevenueSite: null,
      message: "specialRevenueSite not deleted.!",
    });
  }
};

module.exports = {
  specialRevenueSiteCreate,
  specialRevenueSiteGetAll,
  specialRevenueSiteGetOne,
  specialRevenueSiteUpdate,
  specialRevenueSiteDelete,
};
