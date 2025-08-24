import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const merchantSchema = new mongoose.Schema(
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
      //   validator: function (value) {F
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
      select: false, // ignore while querying
    },
    confirmPassword: {
      type: String,
      required: [true, "confirm password field is mandatory"],
      minLength: [6, "password should have a minimum of 6 characters"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password and confirm password do not match",
      },
    },
    role: {
      type: String,
      default: "merchant",
    },
  },
  {
    timestamps: true,
  }
);

merchantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // if password not modified don't hash it

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

const Merchant = mongoose.model("Merchant", merchantSchema);
export default Merchant;


// import mongoose from "mongoose";
// import bcrypt from 'bcryptjs'

// const merchantSchema = new mongoose.Schema(
//     {
//         username: {
//             type: String,
//             required: [true, "username field is mandatory"],
//             trim: true,
//             minLength: [3, "username should have minimum of 3 characters"]
//         },
//         email: {
//             type: String,
//             required: [true, "email field is mandatory"],
//             trim: true,
//             unique: true,
//             validate: {
//                 validator: function (value) {
//                     return value.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
//                 },
//                 message: "Invalid email ID"
//             }
//         },
//         password: {
//             type: String,
//             required: [true, "password field is mandatory"],
//             minLength: [6, "password should have a minimum of 6 characters"]
//         },
//         confirmPassword: {
//             type: String,
//             required: [true, "password field is mandatory"],
//             minLength: [6, "password should have a minimum of 6 characters"],
//             validate: {
//                 validator: function (value) {
//                     return value === this.password
//                 },
//                 message: "password and confirm password not matching"
//             }
//         },
//         role: {
//             type: String,
//             default: "merchant"
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// merchantSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10)
//         this.confirmPassword = undefined
//         next()
//     } else {
//         throw new Error("error hashig the password")
//     }
// })

// let Merchant = mongoose.model("Merchant", merchantSchema)

// export default Merchant