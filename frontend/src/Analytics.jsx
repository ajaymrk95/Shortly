
import React from 'react'
import { useState } from 'react'
import illustrationWorking from "./assets/illustration-working.svg"
import axios from "axios"

const Analytics = () => {

  const [limit, setLimit] = useState(10)
  const [links, setLinks] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleFetch = async (e) => {

    e.preventDefault();

    try{

         const response = await axios.post(`${apiUrl}/stats`,{count:limit})

         if(response)
        {
           console.log(response.data.resultantRows)
           setLinks(response.data.resultantRows)
        }
    } 
    
    catch (error) 
    {
       console.log(error)
    }

   
  }

  return (
    <>
      
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Link Analytics
          </h1>
          <p className="text-gray-600 mb-6 text-lg md:text-xl">
            View your top performing shortened links based on click count.
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-700">
            Insights Dashboard
          </h2>
        </div>

        <img
          src={illustrationWorking}
          className="w-full md:w-1/2 max-w-md"
          alt="Analytics Illustration"
        />
      </div>

    
      <div className="mt-10 w-full flex justify-center">
        <div className="flex flex-col justify-center items-center gap-4 p-6 bg-white rounded-lg shadow-md sm:flex-row w-[70%] md:w-[40%]">
          
          <input
            type="number"
            min="1"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-800"
            placeholder="Top N links"
          />

          <button
            onClick={handleFetch}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
          >
            Get Top Links
          </button>
        </div>
      </div>

   
      {links.length > 0 && (
        <div className="mt-10 w-full flex justify-center">
          <div className="w-[90%] overflow-x-auto sm:w-[50%]">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Short URL</th>
                  <th className="px-4 py-3 text-left">Original URL</th>
                  <th className="px-4 py-3 text-left">Clicks</th>
                </tr>
              </thead>

              <tbody>
                {links.map((link, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-purple-600 font-medium">
                      {link.shortcode}
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      {link.longurl}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {link.clickcount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default Analytics
