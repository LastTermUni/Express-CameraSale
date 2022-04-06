import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

export async function dbConnect() {
  await mongoose.connect(process.env.DB_URI || "", { connectTimeoutMS: 15000 }).then(() => {
    console.log(`Mongo has connected on ${mongoose.connection.port}`);
  }).catch(err => {
    console.error(err);
  })
}