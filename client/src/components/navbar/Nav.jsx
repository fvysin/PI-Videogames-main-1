// Nav.jsx
import React from 'react'
import Search from './search/Search'
import {  useNavigate } from 'react-router-dom';
import FilterSource from '../filters/filterSource/FilterSource';
import FilterGenres from '../filters/filterGenres/FilterGenres';
import Order from '../filters/order/Order';
import Reset from '../filters/reset/Reset';
import './Nav.css'
import Ratings from '../filters/ratings/Ratings';
import { usePagination } from '../PaginationContext';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { resetPage,allVideogames } from '../../redux/actions';


const Nav = () => {
  const navigate = useNavigate();

  const { setPagina } = usePagination();
  const dispatch = useDispatch(); // 
  const [searchValue, setSearchValue]= useState("")


  const handleFilterChange = () => {
    dispatch(resetPage());
  }
  const handleHomeClick = () => {
    // Limpiar el término de búsqueda al hacer clic en "Home"
    setSearchValue("");
    dispatch(allVideogames());
    setPagina(1);
    navigate('/home')
  };


  return (
    <div className='containerNav'>
      <div className='imageLogo'>
        {/* <img src={require('../../imagenes/Diseño_sin_título__28_-removebg-preview.png')}/> */}
      </div>
      <button className='btn' onClick={handleHomeClick} >Home</button>

      <Search />
      <FilterSource onChange={handleFilterChange}/>
      <FilterGenres onChange={handleFilterChange}/>
      <Order onChange={handleFilterChange} />
      <Ratings onChange={handleFilterChange}/>
      <Reset setPagina={setPagina} />
      <button className='btn' onClick={() => navigate('/create')}>Crear Juego</button>
    </div>
  )
}

export default Nav
