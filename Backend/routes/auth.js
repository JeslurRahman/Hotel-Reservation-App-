import express, { application } from "express"
import { register, login } from "../controllers/authCon.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)

export default router