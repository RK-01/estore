import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import bannerRoutes from './routes/bannerRoutes.js'

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/banners', bannerRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payment', paymentRoutes)

app.get('/api/config/razorpay', (req, res)=>{
     res.send({razorKey: process.env.RAZOR_KEY, razorSecret: process.env.RAZOR_SECRET})
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
     app.use(express.static(path.join(__dirname, '/frontend/build')))

     app.get('*', (req, res)=> res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')))
}else{
     app.get('/', (req, res)=> {
          res.send('API is running in dev mode...')
     })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))