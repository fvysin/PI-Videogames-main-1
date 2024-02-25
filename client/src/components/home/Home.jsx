// Home.jsx
import React from 'react'
import Nav from '../navbar/Nav'
import Cards from '../cards/Cards'
import Footer from '../footer/Footer'
import { PaginationProvider } from '../PaginationContext';

const Home = () => {
  return (
    <div>
      <PaginationProvider>
        <Nav />
        <Cards />
      </PaginationProvider>
      <Footer />
    </div>
  )
}

export default Home
