const express = require("express");

const { basedir } = global;

const { users: ctrl } = require(`${basedir}/controllers`);
const { ctrlWrap } = require(`${basedir}/helpers`);

const router = express.Router();

router.get("/", ctrlWrap(ctrl.getAll));

router.get("/:role", ctrlWrap(ctrl.getByRole));

router.post("/", ctrlWrap(ctrl.create));

router.put("/:id", ctrlWrap(ctrl.update));

router.delete("/:id", ctrlWrap(ctrl.remove));

module.exports = router;
