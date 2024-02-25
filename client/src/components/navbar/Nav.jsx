// Nav.jsx
import React from 'react'
import Search from '../navbar/search/Search'
import {  useNavigate } from 'react-router-dom';
import FilterSource from '../filters/filterSource/FilterSource';
import FilterGenres from '../filters/filterGenres/FilterGenres';
import Order from '../filters/order/Order';
import Reset from '../filters/reset/Reset';
import './Nav.css'
import Ratings from '../filters/ratings/Ratings';
import { usePagination } from '../PaginationContext';

const Nav = () => {
  const navigate = useNavigate();
  const { setPagina } = usePagination();

  return (
    <div className='containerNav'>
      <div className='imageLogo'>
        {/* <img src={require('../../imagenes/Diseño_sin_título__28_-removebg-preview.png')}/> */}
      </div>
      <Search />
      <FilterSource />
      <FilterGenres />
      <Order />
      <Ratings />
      <Reset setPagina={setPagina} />
      <button className='btn' onClick={() => navigate('/create')}>Crear Juego</button>
    </div>
  )
}

export default Nav
