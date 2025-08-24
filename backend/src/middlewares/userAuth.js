import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
    try {
        let token = req.headers?.authorization?.split(" ")[1]
        if (!token) {
            res.status(400).json('Please login!!');
            return
        }
        let decodedToken = jwt.verify(token, process.env.JWT_USER_SECRET)
        let user = await User.findById(decodedToken.id)
        if (!user) {
            res.status(400).json('User doest exist anymore please signup!!');
            return
        }
        req.user = {
            id: user._id,
            role: "user"
        }
        next();
    } catch (error) {
        res.status(500).json(error.message);
    }
};