const {
    bookmark_create,
    bookmark_get_all,
    bookmark_get_one,
    bookmark_update,
    bookmark_delete,
  } = require("../Services/BookmarkService");
  
  const bookmarkCreate = async (req, res, next) => {
    try {
      const info = req.body;
      //console.log(info);
      const bookmark = await bookmark_create(info);
      const bookmarkObj = JSON.parse(JSON.stringify(bookmark));
  
      return res.status(200).json({
        error: false,
        bookmark: bookmarkObj,
        message: "bookmark created",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        bookmark: null,
        message: "bookmark not created.!",
      });
    }
  };
  
  const bookmarkGetAll = async (req, res, next) => {
    try {
      const bookmark = await bookmark_get_all();
      const bookmarkObj = JSON.parse(JSON.stringify(bookmark));
  
      return res.status(200).json({
        error: false,
        bookmark: bookmarkObj,
        message: "bookmark's get successfully.!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        bookmark: null,
        message: "bookmark not get.!",
      });
    }
  };
  
  const bookmarkGetOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const bookmark = await bookmark_get_one(id);
      const bookmarkObj = JSON.parse(JSON.stringify(bookmark));
  
      return res.status(200).json({
        error: false,
        bookmark: bookmarkObj,
        message: "bookmark get one",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        bookmark: null,
        message: "bookmark not get.!",
      });
    }
  };
  
  const bookmarkUpdate = async (req, res, next) => {
    try {
      const info = req.body;
      const { id } = req.params;
      //console.log(id, info);
      const bookmark = await bookmark_update(id, info);
      const bookmarkObj = JSON.parse(JSON.stringify(bookmark));
  
      if (bookmarkObj.ok) {
        return res.status(200).json({
          error: false,
          bookmark: bookmarkObj,
          message: "bookmark update successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        bookmark: null,
        message: "bookmark not updated.!",
      });
    }
  };
  
  const bookmarkDelete = async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const bookmark = await bookmark_delete(id);
      const bookmarkObj = JSON.parse(JSON.stringify(bookmark));
  
      if (bookmarkObj.ok) {
        return res.status(200).json({
          error: false,
          bookmark: bookmarkObj,
          message: "bookmark delete successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        bookmark: null,
        message: "bookmark not deleted.!",
      });
    }
  };
  
  module.exports = {
    bookmarkCreate,
    bookmarkGetAll,
    bookmarkGetOne,
    bookmarkUpdate,
    bookmarkDelete,
  };
  