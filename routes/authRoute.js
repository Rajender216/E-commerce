import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing

//Regiseter || MEthod: POST || URL: /api/auth/register
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

//forgot password || POST
router.post("/forgot-password", forgotPasswordController);

//test || Get
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true }); //protected route for user auth check
});
//protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true }); //protected route for user auth check
});
export default router;
