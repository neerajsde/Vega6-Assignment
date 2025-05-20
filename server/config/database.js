import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

export default async function DBConnect(){
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {console.log("✅ Database connected sucessfully.")})
    .catch((err) => {
        console.log("❌ Database not connected");
        console.log(err);
    })
}