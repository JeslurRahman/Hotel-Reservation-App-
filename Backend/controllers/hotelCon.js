import Hotel from "../models/Hotel.js";


//create
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err);
    }
}

//update
export const updateHotel = async (req, res, next) => {

    try {
        const updateHotel = await Hotel.findByIdAndUpdate
            (
                req.params.id,
                { $set: req.body },
                { new: true }
            )

        res.status(200).json(updateHotel);
    } catch (err) {
        next(err);
    }
}

//delete
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err);
    }
}

//Get one
export const getHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    } catch (err) {
        next(err);
    }
}

//getAll
export const getAllHotel = async (req, res, next) => {

    const failed = true;
    // if (failed) return next(createError(401,"you are not authenticated"));

    try {
        const getAllHotel = await Hotel.find();
        res.status(200).json(getAllHotel);
    } catch (err) {
        next(err);

    }
}

/*
export const countByCity = async (req, res, next) => {

    const cities =req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city})
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err);

    }
}

*/