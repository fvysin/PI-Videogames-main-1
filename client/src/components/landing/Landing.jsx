import React from 'react'
import {  useNavigate } from 'react-router-dom';
import './Landing.css'

const Landing = () => {

  const navigate = useNavigate()

  return (
      <div className='landing'>
        
          
          <div class="contenedorSlinder">
            <div class="contenedorInputs">
              <input type="radio" name="slinder" id="item-1" />
              <input type="radio" name="slinder" id="item-2" checked/>
              <input type="radio" name="slinder" id="item-3" />

              <div class="cards">
                <label class="card" for="item-1" id="selector-1">
                  <img className='imgSli' src="https://media.rawg.io/media/games/587/587588c64afbff80e6f444eb2e46f9da.jpg" alt="" />
                </label>
                <label class="card" for="item-2" id="selector-2">
                  <img className='imgSli' src={require('../../imagenes/Diseño_sin_título__28_-removebg-preview.png')} alt="" />
                </label>
                <label class="card" for="item-3" id="selector-3">
                  <img className='imgSli' src="https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg" alt="" />
                </label>
              </div>
            </div>
          </div>

        <div className='containerBienvenida'>
          <button className='bienvenida' onClick={() => navigate('/home')}>Inicio</button>
        </div>

          <div className='contBanner'>
            <img className='imgBan' src={require('../../imagenes/PI VIDEOGAMES.png')} alt="" />
          </div>
      </div>
  )
}

export default Landing