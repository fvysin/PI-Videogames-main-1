import React from 'react'
import Search from '../search/Search'
import {  useNavigate } from 'react-router-dom';
import FilterSource from '../filterSource/FilterSource';
import FilterGenres from '../filterGenres/FilterGenres';
import Order from '../order/Order';
import Reset from '../reset/Reset';
import './Nav.css'
import Ratings from '../ratings/Ratings';

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