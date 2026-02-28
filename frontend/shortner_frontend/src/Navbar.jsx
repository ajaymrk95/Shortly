import React from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/logo.svg'



const Navbar = ({children}) => {
  return (
      <nav className="w-full h-[9vh] sticky top-0 z-50 flex items-center justify-around h-16 px-4 sm:px-6 mb-8 bg-gradient-to-r from-purple-700/85 to-purple-900/65 backdrop-blur-md border-b border-purple-800/60 shadow-lg">
          <img src={logo} className="h-9 w-auto mr-4"/>
        <Link to="/" className="text-white hover:text-purple-200 transition-colors duration-200 text-xl font-semibold tracking-wide px-3 py-2 rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-400/40">Home</Link>
        <Link to="/analytics" className="text-white hover:text-purple-200 transition-colors font-semibold duration-200 text-xl tracking-wide px-3 py-2 rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-400/40">Analytics</Link>
    </nav>
  )
}

export default Navbar