const { Users } = require("../models");
const { Op } = require("sequelize");

const findUsers = async (req, res, next) => {
  try {
    const { userName, page = 1 } = req.query;

    const intPage = parseInt(page);
    if (intPage <= 0) {
      return res.status(400).json({
        status: "Failed",
        message: "Bad request",
        isSuccess: false,
        data: null,
      });
    }

    // limit adalah parameter untuk batas data yang akan ditampilkan
    const limit = 10;

    // offset adalah parameter untuk pembatas data, misal offset = 0, maka data yang ditampilkan dari 1 sampai limit
    const offset = (intPage - 1) * limit;

    const condition = {};
    if (userName) condition.name = { [Op.iLike]: `%${userName}%` };

    const users = await Users.findAll({
      where: condition,
      limit,
      offset,
    });

    // total user pada database
    const totalUser = await Users.count();

    // total data yang di dapat
    const totalData = users.length;

    res.status(200).json({
      status: "Success",
      totalPages: Math.ceil(totalUser / limit),
      page: intPage,
      data: {
        totalData,
        users,
      },
    });
  } catch (err) {}
};

const findUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {}
};

const updateUser = async (req, res, next) => {
  const { name, age, role, address, shopId } = req.body;
  try {
    await Users.update(
      {
        name,
        age,
        role,
        address,
        shopId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update user",
    });
  } catch (err) {}
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete user",
    });
  } catch (err) {}
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
