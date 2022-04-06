import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnect } from "./config/db";
import ErrorHandler from "./middlewares/ErrorHandle";
import { prodRoute, userRoute } from "./router";

dotenv.config();
dbConnect();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(ErrorHandler);
app.use("/user", userRoute)
app.use("/product", prodRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})