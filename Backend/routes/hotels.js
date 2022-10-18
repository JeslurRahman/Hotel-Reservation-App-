import express from "express"
import {
    createHotel,
    deleteHotel,
    getHotel,
    updateHotel,
    getAllHotel
} from "../controllers/hotelCon.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/**async / await
 * The purpose of async / await is to simplify the syntax necessary to consume promise-based APIs. 
 * The behavior of async / await is similar to combining generators and promises.
 * Async functions always return a promise.
 */

//create
router.post("/add", verifyAdmin, createHotel);

//update
router.put("/:id", verifyAdmin, updateHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);

//get
router.get("/find/:id", getHotel)

//getall
router.get("/", getAllHotel)

/*
router.get("/", getAllHotel)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
*/


export default router