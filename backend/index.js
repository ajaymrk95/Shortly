import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {dbConnect} from "./database/pool.js"
import router from "./controllers/urlController.js";
import createDB from "./database/initdb.js";

const app = express();

dotenv.config()

app.use(express.json())
app.use(cors());


const PORT = process.env.PORT || 8000

app.use('/',router);

app.listen(PORT, async ()=>
{
    try {

       
        await createDB()
        await dbConnect()
    
        console.log(`App running on ${PORT}`);

    } 

    catch (error) {
        console.log(error)

    }
})

