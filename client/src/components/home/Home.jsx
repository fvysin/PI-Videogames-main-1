import React from 'react'
import Nav from '../navbar/Nav'
import Cards from '../cards/Cards'
import Footer from '../footer/Footer'

const Home = () => {

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <Cards />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home