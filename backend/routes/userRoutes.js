const express = require("express");
const router = express.Router();
const { getTopUsers } = require("../controllers/userController");

router.get("/", getTopUsers);

module.exports = router;
