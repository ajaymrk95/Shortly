import pool from "./pool.js";

const createDB = async()=>
{
    const query = `CREATE TABLE IF NOT EXISTS urls
    (
        id SERIAL PRIMARY KEY,
        longurl VARCHAR(100) NOT NULL,
        shortcode VARCHAR(10) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT NOW(),
        clickcount INTEGER DEFAULT 0
    )`

    try {
        
        await pool.query(query);
        console.log("Table Created or Exists")
        
    } catch (error) {
        console
    }
    
}

export default createDB