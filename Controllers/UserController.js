const {
  user_create,
  user_get_all,
  user_get_one,
  user_update,
  user_delete,
  findUserByEmail
} = require("../Services/UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRoute = 10

// =========== Register user control - hash password ==============
hashPassword = (password, salt) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
};

// =========== Login user control - password compare ==============
comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) {
        reject(err);
      }
      resolve(match);
    });
  });
};


const userCreate = async (req, res, next) => {
  try {
    const info = req.body;
    //console.log(info);
    const userCreate = await findUserByEmail(info.email);
    if (userCreate) {
      return res.status(401).json({
        error: true,
        user: null,
        message: `${info.email} This user already exists`,
      });
    }
    const user = await user_create({ ...info, walletAmount: 0, totalMinuteServed: 0, totalAdsViewed: 0 });
    const userObj = JSON.parse(JSON.stringify(user));

    return res.status(200).json({
      error: false,
      user: userObj,
      message: "user created",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "Internal Server Error!",
    });
  }
};

const userGetAll = async (req, res, next) => {
  try {
    const user = await user_get_all();
    const userObj = JSON.parse(JSON.stringify(user));

    return res.status(200).json({
      error: false,
      user: userObj,
      message: "user's get successfully.!",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "Internal Server Error!",
    });
  }
};

const userGetOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const user = await user_get_one(id);
    const userObj = JSON.parse(JSON.stringify(user));

    return res.status(200).json({
      error: false,
      user: userObj,
      message: "user get one",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "Internal Server Error!",
    });
  }
};

const userUpdate = async (req, res, next) => {
  try {
    const info = req.body;
    const { id } = req.params;
    //console.log(id, info);
    const userUp = await user_update(id, info);
    if (!userUp) {
      return res.status(401).json({
        error: true,
        user: null,
        message: "not update",
      });
    }

    const user = await user_get_one(id)
    const userObj = JSON.parse(JSON.stringify(user));
    return res.status(200).json({
      error: false,
      user: userObj,
      message: "user update successfully",
    });

  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "Internal Server Error!",
    });
  }
};

const userDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const user = await user_delete(id);
    const userObj = JSON.parse(JSON.stringify(user));

    if (userObj.ok) {
      return res.status(200).json({
        error: false,
        user: userObj,
        message: "user delete successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "Internal Server Error!",
    });
  }
};


// -------------------- login user --------------
const loginController = async (req, res, next) => {
  try {
    //console.log(req.body);
    const user = await findUserByEmail(req.body.email);

    if (!user) {
      return res.status(400).json({
        error: true,
        user: null,
        message: `${req.body.email}, This user is not Register.!`,
      });
    }
    const matchPassword = await (req.body.password === user.password);
    if (!matchPassword) {
      return res.status(400).json({
        error: true,
        user: null,
        message: `${req.body.password}, This password is incorrect..!`,
      });
    }
    const userObj = JSON.parse(JSON.stringify(user));


    return res.status(200).json({
      error: false,
      user: userObj,
      message: "user login successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
      user: null,
      message: "Internal Server Error!",
    });
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        error: true,
        user: null,
        message: `${email}, This user is not Register.!`,
      });
    }

    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;

    // Generate Token for user with this id valid for only 20 minute
    const token = await jwt.sign(
      {
        user: userObj,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "20m",
      }
    );

    // send email with this token
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_FROM,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });
    // const mailOptions = {
    //   from: process.env.EMAIL_FROM,
    //   to: email,
    //   subject: "Password Reset link",
    //   html: `
    //               <h1>Please use the following to Reset your Password</h1>
    //               <h3>Modern E-commerce</h3>
    //               <a href="${process.env.CLIENT_URL}/users/password/reset/${token}">
    //                 <button className="btn btn-success">Reset Your Password</button>
    //               </a>

    //               <hr />
    //               <p>This email may containe sensetive information</p>
    //               <p>${process.env.CLIENT_URL}</p>
    //           `,
    // };

    // ======== return Reset Password Token link ====
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log(error.message);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //     return res.status(200).json({
    //       error: false,
    //       message: `Email has been sent to ${email}. Follow the instruction to Reset your Password.`,
    //     });
    //   }
    // });



  } catch (error) {
    console.log("ERROR : ", error)
    return res.status(500).json({
      error: error,
      user: null,
      message: "Internal Server Error.!",
    });
  }
}


const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body

    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWTTT...", verified);
    if (!verified) {
      return res.status(400).json({
        error: true,
        data: null,
        token: null,
        message: "Expired Token, Try again..!",
      });
    }
    //  if valid save to database
    // Get name email password form token
    const { user } = jwt.decode(token);
    const password = await hashPassword(newPassword, saltRoute);
    const info = { ...user, password };
    const userInfo = await userService.updateInfo(user._id, info);
    const userObj = JSON.parse(JSON.stringify(userInfo));
    // console.log("control ",info);
    // console.log("control : ",userObj);
    delete userObj.password;

    // const newToken = await jwt.sign(
    //   {
    //     user: userObj,
    //   },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: "1d",
    //   }
    // );

    return res.status(200).json({
      error: false,
      user: userObj,
      message: "Password Reset Successfully.! Now, Try to login",
    });


  } catch (error) {
    console.log("ERROR : ", error)
    return res.status(500).json({
      error: error,
      user: null,
      message: "Internal Server Error.!",
    });
  }
}

module.exports = {
  userCreate,
  userGetAll,
  userGetOne,
  userUpdate,
  userDelete,
  loginController,

  forgetPassword,
  resetPassword
};
