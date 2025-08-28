import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import dbConnet from './db/db.js'
import cors from 'cors'
import merchantRoutes from './routes/merchantRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cart.routes.js'
import orderRoutes from "./routes/order.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js"

dbConnet()
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies/headers (if needed)
}))

app.use(express.json())

app.use("/api/auth/merchant", merchantRoutes)
app.use("/api/auth/user", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes);
app.use("/api/invoice", invoiceRoutes);

// app.get('/', (req, res, next) => {
//     res.send("working")
// })


export default app