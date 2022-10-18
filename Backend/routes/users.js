import express from "express"
import {
    createUser,
    deleteUser,
    getUser,
    updateUser,
    getAllUser
} from "../controllers/userCon.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

const router = express.Router();

/**async / await
 * The purpose of async / await is to simplify the syntax necessary to consume promise-based APIs. 
 * The behavior of async / await is similar to combining generators and promises.
 * Async functions always return a promise.
 */

//create
router.post("/add", verifyUser, createUser);

//update
router.put("/:id", verifyUser, updateUser);

//delete
router.delete("/:id", verifyUser, deleteUser);

//get
router.get("/:id", verifyUser, getUser)

//getall
router.get("/", verifyAdmin, getAllUser)



export default router