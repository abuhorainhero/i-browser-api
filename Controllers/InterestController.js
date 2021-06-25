const {
    interest_create,
    interest_get_all,
    interest_get_one,
    interest_update,
    interest_delete,
  } = require("../Services/InterestService");
  
  const interestCreate = async (req, res, next) => {
    try {
      const info = req.body;
      //console.log(info);
      const interest = await interest_create(info);
      const interestObj = JSON.parse(JSON.stringify(interest));
  
        return res.status(200).json({
          error: false,
          interest: interestObj,
          message: "interest created",
        });
    } catch (error) {
      return res.status(500).json({
        error: error,
        interest: null,
        message: "interest not created.!",
      });
    }
  };
  
  const interestGetAll = async (req, res, next) => {
    try {
      const interest = await interest_get_all();
      const interestObj = JSON.parse(JSON.stringify(interest));
  
  
        return res.status(200).json({
          error: false,
          interest: interestObj,
          message: "interest's get successfully.!",
        });
      
    } catch (error) {
      return res.status(500).json({
        error: error,
        interest: null,
        message: "interest not get.!",
      });
    }
  };
  
  const interestGetOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const interest = await interest_get_one(id);
      const interestObj = JSON.parse(JSON.stringify(interest));
  
  
        return res.status(200).json({
          error: false,
          interest: interestObj,
          message: "interest get one",
        });
      
    } catch (error) {
      return res.status(500).json({
        error: error,
        interest: null,
        message: "interest not get.!",
      });
    }
  };
  
  const interestUpdate = async (req, res, next) => {
    try {
      const info = req.body;
      const { id } = req.params;
      //console.log(id, info);
      const interest = await interest_update(id, info);
      const interestObj = JSON.parse(JSON.stringify(interest));
  
      if (interestObj.ok) {
        return res.status(200).json({
          error: false,
          interest: interestObj,
          message: "interest update successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        interest: null,
        message: "interest not updated.!",
      });
    }
  };
  
  const interestDelete = async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const interest = await interest_delete(id);
      const interestObj = JSON.parse(JSON.stringify(interest));
  
      if (interestObj.ok) {
        return res.status(200).json({
          error: false,
          interest: interestObj,
          message: "interest delete successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        interest: null,
        message: "interest not deleted.!",
      });
    }
  };
  
  module.exports = {
    interestCreate,
    interestGetAll,
    interestGetOne,
    interestUpdate,
    interestDelete,
  };
  