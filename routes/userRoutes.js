const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router.route("/load").get(userController.loadUsers);
router.route("/export").get(userController.exportAllUser);
router.route("/:id").put(userController.updateUser);

module.exports = router;
