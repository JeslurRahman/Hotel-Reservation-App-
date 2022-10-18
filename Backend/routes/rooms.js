import express from "express"
import {
    createRoom,
    deleteRoom,
    getRoom,
    updateRoom,
    getAllRoom
} from "../controllers/roomCon.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/**async / await
 * The purpose of async / await is to simplify the syntax necessary to consume promise-based APIs. 
 * The behavior of async / await is similar to combining generators and promises.
 * Async functions always return a promise.
 */

//create
router.post("/add/:hotelId", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updateRoom);

//delete
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

//get
router.get("/:id", getRoom)

//getall
router.get("/", getAllRoom)



export default router