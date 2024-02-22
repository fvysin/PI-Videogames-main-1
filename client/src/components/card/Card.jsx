import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

const Card = ({info}) => {
  return (
    <div key={info.id} className='cardContainer'>
      <Link to={`/detail/${info.id}`}>
        <img src={info.background_image} alt='' />
      </Link>
      <h2>{info.name}</h2>
      <p>{info.genres}</p>
    </div>
  )
}

export default Card