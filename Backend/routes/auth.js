import express, { application } from "express"
import { register } from "../controllers/authCon.js";

const router = express.Router();

router.post("/register", register)

export default router