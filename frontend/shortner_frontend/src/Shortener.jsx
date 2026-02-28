import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import illustrationWorking from "./assets/illustration-working.svg"
import bgImg from "./assets/bg-shorten-desktop.svg"

const Shortener = () => {


  const [url,setUrl] = useState("")
  const [shortUrl,setShortUrl] = useState()


  const handleSubmit = async (e) =>
  {     
       e.preventDefault();

       try 
       {
           const response = await axios.post('http://localhost:8000/shorten',{longurl:url})

           if(response.data)
           {
              setShortUrl(response.data.fullShortUrl)
           }
       } 
       
       catch (error) 
       {
          console.log(error)
          
       }
  }

  return (
    <>
   <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 ">
    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">More than just Shorter Links!</h1>
    <p className="text-gray-600 mb-6 text-lg md:text-xl">
      Build your brand’s recognition and get detailed insights on how your links are performing.
    </p>
    <h2 className="text-2xl md:text-3xl font-semibold text-purple-700">Get Started</h2>
  </div>

  <img src={illustrationWorking} className="w-full md:w-1/2 max-w-md" />
</div>

<div className="mt-10 w-full flex justify-center formcontainer">
 
    <form 
        className="flex flex-col items-center gap-4 w-[75%] p-6 md:px-0 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
    >
        <input 
        type='url'
        required
        placeholder='Enter your Long URL'
        value={url}
        onChange={(e)=>{setUrl(e.target.value)}}
        className="flex-1 px-4 py-3 rounded-md border w-[50%] border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-800"
        />
        <button 
        type="submit"
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
        >
        Shorten Now
        </button>

        {
          shortUrl && 
         <div>
          Your Short URL is : <a href={shortUrl}>{shortUrl}</a>
         </div>
        
        }
        </form>
  </div>

     
    </>
  )
}

export default Shortener