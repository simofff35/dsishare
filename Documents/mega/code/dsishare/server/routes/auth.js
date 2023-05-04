const express = require("express");
const login = require("../controllers/auth.js");

exports.route = express.Router;

//Login
router.post("/login", login);
