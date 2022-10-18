import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"

// const express = required("express")
//instead of these code line structure  we can use  "type": "module", in package.json file

const app = express()

dotenv.config()

try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB.")
} catch (error) {
    handleError(error);
}

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!")
})

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!")
})

//middleware

app.use(express.json())
/**By default cannot send any json object to express server 
 * so to prevent this we should use = app.use(express.json())
 */

app.use("/auth", authRoute)
app.use("/rooms", roomsRoute)
app.use("/hotels", hotelsRoute)
app.use("/users", usersRoute)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json(errorMessage).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,

    })
})

app.listen(8800, () => {
    console.log("Connected to backend")
})
