const {
  city_create,
  city_get_all,
  city_get_one,
  city_update,
  city_delete,
} = require("../Services/CityService");

const cityCreate = async (req, res, next) => {
  try {
    const info = req.body;
    //console.log(info);
    const city = await city_create(info);
    const cityObj = JSON.parse(JSON.stringify(city));

    return res.status(200).json({
      error: false,
      city: cityObj,
      message: "city created",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      city: null,
      message: "city not created.!",
    });
  }
};

const cityGetAll = async (req, res, next) => {
  try {
    const city = await city_get_all();
    const cityObj = JSON.parse(JSON.stringify(city));


    return res.status(200).json({
      error: false,
      city: cityObj,
      message: "city's get successfully.!",
    });

  } catch (error) {
    return res.status(500).json({
      error: error,
      city: null,
      message: "city not get.!",
    });
  }
};

const cityGetOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const city = await city_get_one(id);
    const cityObj = JSON.parse(JSON.stringify(city));


    return res.status(200).json({
      error: false,
      city: cityObj,
      message: "city get one",
    });

  } catch (error) {
    return res.status(500).json({
      error: error,
      city: null,
      message: "city not get.!",
    });
  }
};

const cityUpdate = async (req, res, next) => {
  try {
    const info = req.body;
    const { id } = req.params;
    const cityUp = await city_update(id, info);
    if (!cityUp) {
      return res.status(400).json({
        error: true,
        city: null,
        message: "city not updated!"
      })
    }

    const city = await city_get_one(id)
    const cityObj = JSON.parse(JSON.stringify(city));

    return res.status(200).json({
      error: false,
      city: cityObj,
      message: "city update successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      city: null,
      message: "city not updated.!",
    });
  }
};

const cityDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cityDel = await city_delete(id);
    if (!cityDel) {
      return res.status(404).json({
        error: true,
        city: null,
        message: "City not deleted!"
      })
    }

    const city = await city_get_one(id);
    const cityObj = JSON.parse(JSON.stringify(city));

    return res.status(200).json({
      error: false,
      city: cityObj,
      message: "city delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      city: null,
      message: "city not deleted.!",
    });
  }
};

module.exports = {
  cityCreate,
  cityGetAll,
  cityGetOne,
  cityUpdate,
  cityDelete,
};
