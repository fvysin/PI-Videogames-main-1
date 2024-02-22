import React from 'react'
import Search from '../navbar/search/Search'
import {  useNavigate } from 'react-router-dom';
import FilterSource from '../navbar/filterSource/FilterSource';
import FilterGenres from '../navbar/filterGenres/FilterGenres';
import Order from '../navbar/order/Order';
import Reset from '../navbar/reset/Reset';
import './Nav.css'
import Ratings from '../navbar/ratings/Ratings';

const Nav = () => {

  const navigate = useNavigate()

  return (
    <div className='containerNav'>
      <div className='imageLogo'>
        <img src={require('../../imagenes/Diseño_sin_título__28_-removebg-preview.png')}/>
      </div>
      <Search />
      <FilterSource />
      <FilterGenres />
      <Order />
      <Ratings />
      <Reset />
      <button className='btn' onClick={() => navigate('/create')}>Crear Juego</button>
    </div>
  )
}

export default Nav