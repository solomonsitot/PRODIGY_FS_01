const path = require("path");
const express = require("express");
const auth_mw = require("../middleware/auth_mw");
const {
  signup,
  Login,
  logStatus,
  userInfo,
  logout,
} = require("../controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", Login);
router.post("/logout", logout);
router.get("/get-log-status", logStatus);
router.get("/get-current-user", auth_mw, userInfo);
module.exports = router;
