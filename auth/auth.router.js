const { SignUp, SignIn } = require("./auth.controller");

const router = require("express").Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);

module.exports = router;
