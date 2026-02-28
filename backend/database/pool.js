import {Pool} from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool(
    {
        connectionString: process.env.URI,
        ssl: {
            rejectUnauthorized:false,
        },
       
    }
)


export const dbConnect = async()=>
{
    try {
        
        
        const {rows} = await pool.query("SELECT * from urls")
        console.log(rows)
        

    } 
    catch (error) {
        console.log(error)    
    }
}

export default pool //will be used to add and query to the database