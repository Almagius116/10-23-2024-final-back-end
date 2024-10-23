const router = require("express").Router();

const userController = require("../controllers/userController");

// router.post("", shopController.createShop);
router.get("", userController.findUsers);
// router.get("/:id", shopController.getShopById);
// router.patch("/:id", shopController.updateShop);
// router.delete("/:id", shopController.deleteShop);

module.exports = router;
