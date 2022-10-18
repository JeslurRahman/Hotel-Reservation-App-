import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Room.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            })
        } catch (err) {
            next(err)

        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)

    }
}

//update
export const updateRoom = async (req, res, next) => {

    try {
        const updateRoom = await Room.findByIdAndUpdate
            (
                req.params.id,
                { $set: req.body },
                { new: true }
            )

        res.status(200).json(updateRoom);
    } catch (err) {
        next(err);
    }
}

//delete
export const deleteRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;

    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            const savedRoom = await newRoom.save();
            try {
                await Room.findByIdAndUpdate(hotelId, {
                    $pull: { rooms: req.params.id },
                })
            } catch (err) {
                next(err)

            }
            res.status(200).json(savedRoom)
        } catch (err) {
            next(err)

        }
        res.status(200).json("Room has been deleted");
    } catch (err) {
        next(err);
    }
}

//Get one
export const getRoom = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(req.params.id)
        res.status(200).json(getRoom)
    } catch (err) {
        next(err);
    }
}

//getAll
export const getAllRoom = async (req, res, next) => {

    const failed = true;
    // if (failed) return next(createError(401,"you are not authenticated"));

    try {
        const getAllRoom = await Room.find();
        res.status(200).json(getAllRoom);
    } catch (err) {
        next(err);

    }
}