const { Auth, Users } = require("../models");

const register = async (req, res, next) => {
  try {
    res.status(201).json({
      status: "Success",
      data: {},
    });
  } catch (err) {}
};

const login = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Berhasil login",
      data: token,
    });
  } catch (err) {}
};

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {}
};

module.exports = {
  register,
  login,
  authenticate,
};
