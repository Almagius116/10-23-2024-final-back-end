const { Shops, Products, Users } = require("../models");

const createShop = async (req, res) => {
  const { name, adminEmail, userId } = req.body;

  try {
    const newShop = await Shops.create({
      name,
      adminEmail,
      userId,
    });

    res.status(201).json({
      status: "Success",
      message: "Success create new Shop",
      isSuccess: true,
      data: {
        newShop,
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    } else if (error.name === "SequelizeDatabaseError") {
      return res.status(400).json({
        status: "Failed",
        message: error.message || "Database error",
        isSuccess: false,
        data: null,
      });
    } else {
      res.status(500).json({
        status: "Failed",
        message: "An unexpected error occurred",
        isSuccess: false,
        data: null,
      });
    }
  }
};

const getAllShop = async (req, res) => {
  try {
    const shops = await Shops.findAll({
      include: [
        {
          model: Products,
          as: "products",
          attributes: ["name", "images"],
        },
        {
          model: Users,
          as: "user",
          attributes: ["name"],
        },
      ],
      attributes: ["name", "adminEmail"],
    });

    res.status(200).json({
      status: "Success",
      message: "Success get shops data",
      isSuccess: true,
      data: {
        shops,
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Fail",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const getShopById = async (req, res) => {
  const id = req.params.id;

  try {
    const Shop = await Shops.findOne({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Success get shop data",
      isSuccess: true,
      data: {
        Shop,
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Fail",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const updateShop = async (req, res) => {
  const id = req.params.id;
  const { name, adminEmail } = req.body;

  try {
    const Shop = await Shops.findOne({
      where: {
        id,
      },
    });

    if (!Shop) {
      res.status(404).json({
        status: "Fail",
        message: "Data not found",
        isSuccess: false,
        data: null,
      });
    }

    await Shops.update({
      name,
      adminEmail,
    });

    res.status(200).json({
      status: "Success",
      message: "Success update shop",
      isSuccess: true,
      data: {
        Shop: {
          id,
          name,
          stock,
          price,
        },
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Fail",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const deleteShop = async (req, res) => {
  const id = req.params.id;

  try {
    const Shop = await Shops.findOne({
      where: {
        id,
      },
    });

    if (!Shop) {
      res.status(404).json({
        status: "Fail",
        message: "Data not found",
        isSuccess: false,
        data: null,
      });
    }

    await Shops.destroy();

    res.status(200).json({
      status: "Success",
      message: "Success delete shop",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Fail",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = {
  createShop,
  getAllShop,
  getShopById,
  updateShop,
  deleteShop,
};
