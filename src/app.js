import express from "express";
import cors from "cors"
import morgan from "morgan"
import router from "./routes/index.js"
// import dotenv from "dotenv"
// dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use("/api", router)

app.get('/',(req, res)=>{
    res.send("Server is running!")
})


export default app;