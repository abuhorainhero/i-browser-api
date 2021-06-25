const {
    news_create,
    news_get_all,
    news_get_one,
    news_update,
    news_delete,
  } = require("../Services/NewsService");
  
  const newsCreate = async (req, res, next) => {
    try {
      const info = req.body;
      const file = req.file;
      const filePath = `${req.get("host")}/${file.path}`;
      const finalInfo = { ...info, image: filePath };
      //console.log(finalInfo);
      const news = await news_create(finalInfo);
      const newsObj = JSON.parse(JSON.stringify(news));
  
      return res.status(200).json({
        error: false,
        news: newsObj,
        message: "news created",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        news: null,
        message: "news not created.!",
      });
    }
  };
  
  const newsGetAll = async (req, res, next) => {
    try {
      const news = await news_get_all();
      const newsObj = JSON.parse(JSON.stringify(news));
  
      return res.status(200).json({
        error: false,
        news: newsObj,
        message: "news's get successfully.!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        news: null,
        message: "news not get.!",
      });
    }
  };
  
  const newsGetOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const news = await news_get_one(id);
      const newsObj = JSON.parse(JSON.stringify(news));
  
      return res.status(200).json({
        error: false,
        news: newsObj,
        message: "news get one",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        news: null,
        message: "news not get.!",
      });
    }
  };
  
  const newsUpdate = async (req, res, next) => {
    try {
      const { id } = req.params;
      const info = req.body;
      const file = req.file;
      const filePath = `${req.get("host")}/${file.path}`;
      const finalInfo = { ...info, image: filePath };
      //console.log(finalInfo);

      const news = await news_update(id, finalInfo);
      const newsObj = JSON.parse(JSON.stringify(news));
  
      if (newsObj.ok) {
        return res.status(200).json({
          error: false,
          news: newsObj,
          message: "news update successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        news: null,
        message: "news not updated.!",
      });
    }
  };
  
  const newsDelete = async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const news = await news_delete(id);
      const newsObj = JSON.parse(JSON.stringify(news));
  
      if (newsObj.ok) {
        return res.status(200).json({
          error: false,
          news: newsObj,
          message: "news delete successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        news: null,
        message: "news not deleted.!",
      });
    }
  };
  
  module.exports = {
    newsCreate,
    newsGetAll,
    newsGetOne,
    newsUpdate,
    newsDelete,
  };
  