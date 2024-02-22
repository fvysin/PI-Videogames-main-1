import React from 'react'
import {  useNavigate } from 'react-router-dom';
import './ErrorPage.css'
import Footer from '../footer/Footer';

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='contBtnError'>
        <button className='btnn' onClick={() => navigate('/home')}>Volver a Inicio</button>
      </div>
      <div className='contError'>
        <img className='error' src={require('../../imagenes/PAGINA NO ENCONTRADA.png')} alt="" />
      </div>
      <Footer />
    </div>
  )
}

export default ErrorPage