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
const router = express.Router();

/**async / await
 * The purpose of async / await is to simplify the syntax necessary to consume promise-based APIs. 
 * The behavior of async / await is similar to combining generators and promises.
 * Async functions always return a promise.
 */

//create
router.post("/add", createHotel);

//update
router.put("/:id", updateHotel);

//delete
router.delete("/:id", deleteHotel);

//get
router.get("/:id", getHotel)

//getall
router.get("/", getAllHotel)



export default router