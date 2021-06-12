const {
  country_create,
  country_get_all,
  country_get_one,
  country_update,
  country_delete,
} = require("../Services/CountryService");

const countryCreate = async (req, res, next) => {
  try {
    const info = req.body;
    console.log(info);
    const country = await country_create(info);
    const countryObj = JSON.parse(JSON.stringify(country));

    return res.status(200).json({
      error: false,
      country: countryObj,
      message: "Country created",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      country: null,
      message: "Country not created.!",
    });
  }
};

const countryGetAll = async (req, res, next) => {
  try {
    const country = await country_get_all();
    const countryObj = JSON.parse(JSON.stringify(country));

    return res.status(200).json({
      error: false,
      country: countryObj,
      message: "Country's get successfully.!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      country: null,
      message: "Country not get.!",
    });
  }
};

const countryGetOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const country = await country_get_one(id);
    const countryObj = JSON.parse(JSON.stringify(country));

    return res.status(200).json({
      error: false,
      country: countryObj,
      message: "Country get one",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      country: null,
      message: "Country not get.!",
    });
  }
};

const countryUpdate = async (req, res, next) => {
  try {
    const info = req.body;
    const { id } = req.params;
    console.log(id, info);
    const country = await country_update(id, info);
    const countryObj = JSON.parse(JSON.stringify(country));

    if (countryObj.ok) {
      return res.status(200).json({
        error: false,
        country: countryObj,
        message: "Country update successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      country: null,
      message: "Country not updated.!",
    });
  }
};

const countryDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const country = await country_delete(id);
    const countryObj = JSON.parse(JSON.stringify(country));

    if (countryObj.ok) {
      return res.status(200).json({
        error: false,
        country: countryObj,
        message: "Country delete successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      country: null,
      message: "Country not deleted.!",
    });
  }
};

module.exports = {
  countryCreate,
  countryGetAll,
  countryGetOne,
  countryUpdate,
  countryDelete,
};
