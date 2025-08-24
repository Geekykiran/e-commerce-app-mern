import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username field is mandatory"],
            trim: true,
            minLength: [3, "username should have minimum of 3 characters"],
        },
        email: {
            type: String,
            required: [true, "email field is mandatory"],
            trim: true,
            unique: true,
            // validate: {
            //   validator: function (value) {
            //     return value.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
            //   },
            //   message: "Invalid email ID"
            // }
            lowercase: true,
            validate: [validator.isEmail, "Invalid email ID"],
        },
        password: {
            type: String,
            required: [true, "password field is mandatory"],
            minLength: [6, "password should have a minimum of 6 characters"],
            select: false,
        },
        // confirmPassword: {
        //     type: String,
        //     required: [true, "confirm password field is mandatory"],
        //     minLength: [6, "password should have a minimum of 6 characters"],
        //     validate: {
        //         validator: function (value) {
        //             return value === this.password;
        //         },
        //         message: "Password and confirm password do not match",
        //     },
        // },
        profilePic: {
            type: String,
            default: "https://imgs.search.brave.com/8zhNT-iEG1ohnRgjA-pJfyXn7_6yBJhZBRAcMkNBrcQ/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTc0ODcvMTc0/ODc2MzYucG5n",
        },
        role: {
            type: String,
            default: "user",
        },
        cart: {
            type: Schema.Types.ObjectId,
            ref: "Cart"
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
});

const User = mongoose.model("User", userSchema);
export default User;