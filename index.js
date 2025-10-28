import connection from "./src/connections/mongo.connection.js"
import app from "./src/app.js"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT

connection()
.then(()=>{
    app.listen(PORT,()=>{console.log(`Server is running on perfectly ${PORT}`)})
}).catch(()=>{
    console.log("Server Failed")
})