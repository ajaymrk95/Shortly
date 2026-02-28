import express from "express"
import pool from "../database/pool.js"
import {nanoid} from "nanoid"
import rateLimiter from '../middleware/ratelimiter.js'
import redisclient from "../clientConnect.js"

const router = express.Router();
    
router.post("/shorten",rateLimiter,async(req,res)=>
{
    const {longurl} = req.body

    console.log(longurl)

    if(!longurl)
        return res.status(400).json({error:"No long URL"});

    try {
        
        const {rows} = await pool.query(`SELECT * FROM urls WHERE longurl=$1`,[longurl])
        
        if(rows.length>0)
        {   
            const existingShortCode = rows[0].shortcode
            const fullShortUrl = `${req.protocol}://${req.host}/${existingShortCode}`
            
            return res.status(200).json({message:"URL HAS been Shortened",fullShortUrl:fullShortUrl})
        }
        const shortcode = nanoid(7)

         await pool.query(`INSERT INTO urls (longurl,shortcode) VALUES ($1,$2)`,[longurl,shortcode])

        const fullShortUrl = `${req.protocol}://${req.host}/${shortcode}`

        return res.status(201).json({
            message:"Success",
            fullShortUrl:fullShortUrl
        });
    } 

    catch (error) {
        
        console.error(error)
        return res.status(500).json({message:"Could not query the database"})
    }
   

})

router.get("/:shortcode",rateLimiter,async (req,res)=>
{
    const {shortcode} = req.params;

    try {

        const cachedUrl = await redisclient.get(`url:${shortcode}`);

        if (cachedUrl) {

            console.log("Redis Hit! Redirecting...");
            pool.query(`UPDATE urls SET clickcount = clickcount + 1 WHERE shortcode = $1`, [shortcode]);
            return res.redirect(cachedUrl);
        }

        console.log("Cache Miss")


        //query the database if cachemiss
        const checkForUrl = await pool.query(`SELECT * FROM urls WHERE shortcode = $1`,[shortcode])

        if(checkForUrl.rows.length==0)
        {
            return res(404).json({message:"URL not Found"})
        }

        const {longurl} = checkForUrl.rows[0]

        await pool.query(`UPDATE urls set clickcount = clickcount + 1 WHERE shortcode = $1`,[shortcode])

        if(longurl)
        {
            await redisclient.set(`url:${shortcode}`,longurl,{
                EX:3600
            })
            
            return res.redirect(longurl)
        }
            
    } 
    
    catch (error) {
        
        console.error(error);
        res.status(500).json({message:"Could Not Query the database"})
    }
})

router.post('/stats',rateLimiter,async(req,res)=>
{   
    try {

        const {count} = req.body

        if(!count)
            return res.status(400).json({message:"Requested Resource not Found"});
    
        const queryDB = await pool.query(`SELECT * FROM urls ORDER by clickcount DESC LIMIT $1`,[count]);

        if(queryDB.rows.length==0)
        {
            return res.status(404).json({message:"Requested Resource not Found"});

        }

        const resultantRows = queryDB.rows
            
        return res.status(200).json({message:"Success",resultantRows:resultantRows})
    } 
        catch (error) 
        {
            console.error(error);
            return res.status(500).json({message:"Could Not Query the database"})

    }

})

export default router