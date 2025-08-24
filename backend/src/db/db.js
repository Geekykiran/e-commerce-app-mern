import mongoose from 'mongoose'

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`db connected(${process.env.DB_NAME})`);

    } catch (err) {
        console.log("DB connection error:", err.message);
    }
}

export default dbConnect