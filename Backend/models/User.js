import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true }
)

/**A Timestamp represents a point in time independent of any time zone or calendar, represented as seconds and fractions of 
 * seconds at nanosecond resolution in UTC Epoch time.
 *  It is encoded using the Proleptic Gregorian Calendar which extends the Gregorian calendar backwards to year one. */

export default mongoose.model("User", UserSchema)