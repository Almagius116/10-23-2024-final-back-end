const router = require("express").Router();

const { shopController } = require("../controllers");

router.post("", shopController.createShop);
router.get("", shopController.getAllShop);
router.get("/:id", shopController.getShopById);
router.patch("/:id", shopController.updateShop);
router.delete("/:id", shopController.deleteShop);

module.exports = router;
