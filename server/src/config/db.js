import mongoose from 'mongoose'

const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    } catch (error) {
        console.error("Database connection failed")
        console.error(error.message)
        process.exit(1)
    }
}

export default connectDb