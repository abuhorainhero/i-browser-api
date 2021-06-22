const {
  admin_create,
  admin_get_all,
  admin_get_one,
  admin_update,
  admin_delete,
  findAdminByEmail
} = require("../Services/AdminService");

const adminCreate = async (req, res, next) => {
  try {
    const info = req.body;
    console.log(info);
    const admin = await admin_create(info);
    const adminObj = JSON.parse(JSON.stringify(admin));

    return res.status(200).json({
      error: false,
      admin: adminObj,
      message: "admin created",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      admin: null,
      message: "admin not created.!",
    });
  }
};

const adminGetAll = async (req, res, next) => {
  try {
    const admin = await admin_get_all();
    const adminObj = JSON.parse(JSON.stringify(admin));

    return res.status(200).json({
      error: false,
      admin: adminObj,
      message: "admin's get successfully.!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      admin: null,
      message: "admin not get.!",
    });
  }
};

const adminGetOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const admin = await admin_get_one(id);
    const adminObj = JSON.parse(JSON.stringify(admin));

    return res.status(200).json({
      error: false,
      admin: adminObj,
      message: "admin get one",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      admin: null,
      message: "admin not get.!",
    });
  }
};

const adminUpdate = async (req, res, next) => {
  try {
    const info = req.body;
    const { id } = req.params;
    console.log(id, info);
    const admin = await admin_update(id, info);
    const adminObj = JSON.parse(JSON.stringify(admin));

    if (adminObj.ok) {
      return res.status(200).json({
        error: false,
        admin: adminObj,
        message: "admin update successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      admin: null,
      message: "admin not updated.!",
    });
  }
};

const adminDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const admin = await admin_delete(id);
    const adminObj = JSON.parse(JSON.stringify(admin));

    if (adminObj.ok) {
      return res.status(200).json({
        error: false,
        admin: adminObj,
        message: "admin delete successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      admin: null,
      message: "admin not deleted.!",
    });
  }
};


// -------------------- login admin --------------
const loginController = async (req, res, next) => {
  try {
    console.log(req.body);
    const admin = await findAdminByEmail(req.body.email);

    if (!admin) {
      return res.status(400).json({
        error: true,
        admin: null,
        message: `${req.body.email}, This admin is not Register.!`,
      });
    }
    const matchPassword = await (req.body.password === admin.password);
    if (!matchPassword) {
      return res.status(400).json({
        error: true,
        admin: null,
        message: `${req.body.password}, This password is incorrect..!`,
      });
    }
    const adminObj = JSON.parse(JSON.stringify(admin));


    return res.status(200).json({
      error: false,
      admin: adminObj,
      message: "admin login successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      admin: null,
      message: "admin not login.!",
    });
  }
};



module.exports = {
  adminCreate,
  adminGetAll,
  adminGetOne,
  adminUpdate,
  adminDelete,
  loginController
};
