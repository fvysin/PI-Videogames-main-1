import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';


const Card = ({info}) => {
  const genres = Array.isArray(info.genres) ? info.genres.join(' | ') : '';


  return (
    <div key={info.id} className='cardContainer'>
      <Link to={`/detail/${info.id}`}>
        <img src={info.background_image} alt='' />
      </Link>
      <h2>{info.name}</h2>
      <p>{genres}</p>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  background_image: PropTypes.string,
  genres: PropTypes.string,
  rating: PropTypes.number
};

export default Card