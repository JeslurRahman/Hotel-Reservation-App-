import User from "../models/User.js";


//create
export const createUser = async (req, res, next) => {
    const newUser = new User(req.body)

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {
        next(err);
    }
}

//update
export const updateUser = async (req, res, next) => {

    try {
        const updateUser = await User.findByIdAndUpdate
            (
                req.params.id,
                { $set: req.body },
                { new: true }
            )

        res.status(200).json(updateUser);
    } catch (err) {
        next(err);
    }
}

//delete
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted");
    } catch (err) {
        next(err);
    }
}

//Get one
export const getUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id)
        res.status(200).json(getUser)
    } catch (err) {
        next(err);
    }
}

//getAll
export const getAllUser = async (req, res, next) => {

    const failed = true;
    // if (failed) return next(createError(401,"you are not authenticated"));

    try {
        const getAllUser = await User.find();
        res.status(200).json(getAllUser);
    } catch (err) {
        next(err);

    }
}