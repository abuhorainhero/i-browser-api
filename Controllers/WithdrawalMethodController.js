const {
    withdrawalMethod_create,
    withdrawalMethod_get_all,
    withdrawalMethod_get_one,
    withdrawalMethod_update,
    withdrawalMethod_delete,
  } = require("../Services/WithdrawalMethodService");
  
  const withdrawalMethodCreate = async (req, res, next) => {
    try {
      const info = req.body;
      console.log(info);
      const withdrawalMethod = await withdrawalMethod_create(info);
      const withdrawalMethodObj = JSON.parse(JSON.stringify(withdrawalMethod));
  
      return res.status(200).json({
        error: false,
        withdrawalMethod: withdrawalMethodObj,
        message: "withdrawalMethod created",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        withdrawalMethod: null,
        message: "withdrawalMethod not created.!",
      });
    }
  };
  
  const withdrawalMethodGetAll = async (req, res, next) => {
    try {
      const withdrawalMethod = await withdrawalMethod_get_all();
      const withdrawalMethodObj = JSON.parse(JSON.stringify(withdrawalMethod));
  
      return res.status(200).json({
        error: false,
        withdrawalMethod: withdrawalMethodObj,
        message: "withdrawalMethod's get successfully.!",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        withdrawalMethod: null,
        message: "withdrawalMethod not get.!",
      });
    }
  };
  
  const withdrawalMethodGetOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const withdrawalMethod = await withdrawalMethod_get_one(id);
      const withdrawalMethodObj = JSON.parse(JSON.stringify(withdrawalMethod));
  
      return res.status(200).json({
        error: false,
        withdrawalMethod: withdrawalMethodObj,
        message: "withdrawalMethod get one",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        withdrawalMethod: null,
        message: "withdrawalMethod not get.!",
      });
    }
  };
  
  const withdrawalMethodUpdate = async (req, res, next) => {
    try {
      const info = req.body;
      const { id } = req.params;
      console.log(id, info);
      const withdrawalMethod = await withdrawalMethod_update(id, info);
      const withdrawalMethodObj = JSON.parse(JSON.stringify(withdrawalMethod));
  
      if (withdrawalMethodObj.ok) {
        return res.status(200).json({
          error: false,
          withdrawalMethod: withdrawalMethodObj,
          message: "withdrawalMethod update successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        withdrawalMethod: null,
        message: "withdrawalMethod not updated.!",
      });
    }
  };
  
  const withdrawalMethodDelete = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const withdrawalMethod = await withdrawalMethod_delete(id);
      const withdrawalMethodObj = JSON.parse(JSON.stringify(withdrawalMethod));
  
      if (withdrawalMethodObj.ok) {
        return res.status(200).json({
          error: false,
          withdrawalMethod: withdrawalMethodObj,
          message: "withdrawalMethod delete successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error,
        withdrawalMethod: null,
        message: "withdrawalMethod not deleted.!",
      });
    }
  };
  
  module.exports = {
    withdrawalMethodCreate,
    withdrawalMethodGetAll,
    withdrawalMethodGetOne,
    withdrawalMethodUpdate,
    withdrawalMethodDelete,
  };
  