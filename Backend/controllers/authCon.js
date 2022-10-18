import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const login = async (req, res, next) => {
    try {

        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not fount!"))

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!isPasswordCorrect) return next(createError(400, "Wrong Password or Username!"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.jwt)

        const { password, isAdmin, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err)
    }


    /**Why do we use JSON Web Token (JWT)?
Information Exchange: JWTs are a good way of securely transmitting information between parties because they can be signed, 
which means you can be sure that the senders are who they say they are. Additionally, the structure of a JWT allows you to verify 
that the content hasn't been tampered with. 

 we are using JWt to hide user information and send cookie - npm i jsonwebtoken

*/

    //npm i cookie-parser  should install

}