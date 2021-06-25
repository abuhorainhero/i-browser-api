const {
    withdrawalRequest_create,
    withdrawalRequest_get_all,
    withdrawalRequest_get_one,
    withdrawalRequest_update,
    withdrawalRequest_delete,
  } = require("../Services/WithdrawalRequestService");
  
  const withdrawalRequestCreate = async (req, res, next) => {
    try {
      const info = req.body;
      //console.log(info);
      const withdrawalRequest = await withdrawalRequest_create(info);
      const withdrawalRequestObj = JSON.parse(JSON.stringify(withdrawalRequest));
  
      return res.status(200).json({
        error: false,
        withdrawalRequest: withdrawalRequestObj,
        message: "withdrawalRequest created",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        withdrawalRequest: null,
        message: "withdrawalRequest not created.!",
      });
    }
  };
  
  const withdrawalRequestGetAll = async (req, res, next) => {
    try {
      const withdrawalRequest = await withdrawalRequest_get_all();
      const withdrawalRequestObj = JSON.parse(JSON.stringify(withdrawalRequest));
  
      return res.status(200).json({
        error: false,
        withdrawalRequest: withdrawalRequestObj,
        message: "withdrawalRequest's get successfully.!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        withdrawalRequest: null,
        message: "withdrawalRequest not get.!",
      });
    }
  };
  
  const withdrawalRequestGetOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const withdrawalRequest = await withdrawalRequest_get_one(id);
      const withdrawalRequestObj = JSON.parse(JSON.stringify(withdrawalRequest));
  
      return res.status(200).json({
        error: false,
        withdrawalRequest: withdrawalRequestObj,
        message: "withdrawalRequest get one",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        withdrawalRequest: null,
        message: "withdrawalRequest not get.!",
      });
    }
  };
  
  const withdrawalRequestUpdate = async (req, res, next) => {
    try {
      const info = req.body;
      const { id } = req.params;
      //console.log(id, info);
      const withdrawalRequest = await withdrawalRequest_update(id, info);
      const withdrawalRequestObj = JSON.parse(JSON.stringify(withdrawalRequest));
  
      if (withdrawalRequestObj.ok) {
        return res.status(200).json({
          error: false,
          withdrawalRequest: withdrawalRequestObj,
          message: "withdrawalRequest update successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        withdrawalRequest: null,
        message: "withdrawalRequest not updated.!",
      });
    }
  };
  
  const withdrawalRequestDelete = async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const withdrawalRequest = await withdrawalRequest_delete(id);
      const withdrawalRequestObj = JSON.parse(JSON.stringify(withdrawalRequest));
  
      if (withdrawalRequestObj.ok) {
        return res.status(200).json({
          error: false,
          withdrawalRequest: withdrawalRequestObj,
          message: "withdrawalRequest delete successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        withdrawalRequest: null,
        message: "withdrawalRequest not deleted.!",
      });
    }
  };
  
  module.exports = {
    withdrawalRequestCreate,
    withdrawalRequestGetAll,
    withdrawalRequestGetOne,
    withdrawalRequestUpdate,
    withdrawalRequestDelete,
  };
  