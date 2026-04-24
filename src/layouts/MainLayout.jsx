import React from 'react'
import Navbar from './navbar/Navbar'

const MainLayout = ({ children }) => {
  return (
    <div >
      <Navbar />
      
      <main className="px-4 md:px-10 lg:px-20 py-6">
        {children}
      </main>
    </div>
  )
}

export default MainLayout