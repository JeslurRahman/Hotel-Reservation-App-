import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const register = async (req, res, next) => {
    try {

        //To hash a password
        /**
         * Security considerations
         * To encoding a password we should install - bcrypt.js
         * var bcrypt = require('bcryptjs');
           var salt = bcrypt.genSaltSync(10);
           var hash = bcrypt.hashSync("B4c0/\/", salt);
           // Store hash in your password DB.
         */

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,  // req.body.password - instead of this we have used - hash 
        })

        await newUser.save()
        res.status(200).send("User has been Created")
    } catch (err) {
        next(err)
    }
}