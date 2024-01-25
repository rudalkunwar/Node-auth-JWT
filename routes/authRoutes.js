const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();

router.get("/register", authController.register_page);
router.get("/login", authController.login_page);
router.post("/register", authController.user_register);
router.post("/login", authController.user_login);
router.get("/logout", authController.user_logout);

module.exports = router;
