import React, { useEffect, useState } from 'react'
import './Form.css'
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, postVideogame, allVideogames } from '../../redux/actions';
import validation from './validations';


const Form = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const allVideogame = useSelector(state => state.allVideogames)
  const allGenres = useSelector(state => state.allGenres)

  useEffect(() => {
    dispatch(allVideogames())
  }, [])

  useEffect(() => {
    dispatch(getGenres())
  }, [])

  const allPlatafor = allVideogame.map((game) => game.parent_platforms)
  const allPlatforms = [...new Set(allPlatafor.flatMap(game => game.split(',').map(plataforma => plataforma.trim())))]

  const [state, setState] = useState({
    name: "",
    background_image:"",
    description_raw: "",
    parent_platforms: [],
    released: "",
    rating: "",
    genres: []
})


const [error, setError] = useState({
  name: "",
  background_image: "",
  description_raw: "",
  parent_platforms: "",
  released: "",
  rating: "" ,
  genres: ""
})

const handlerChange = (event) => {
  let { name, value } = event.target;

  if (name === "genres" || name === "parent_platforms") {
    if (!state[name].includes(value)) {
      setState({
        ...state,
        [name]: [...state[name], value]
      });
    }
  } else {
    setState({
        ...state,
        [name]: value
      })
    } setError(validation({
      ...state,
      [name]: value
    }))
  } 

  const disable = () => {
    return Object.values(error).some(err => err !== "") || Object.values(state).some(value => value === "")
  }

  const handlerSubmit = (event) => {
    event.preventDefault()

    dispatch(postVideogame(state))
    setState({
      name: "",
      background_image:"",
      description_raw: "",
      parent_platforms: [],
      released: "",
      rating: "",
      genres: []
    })
    alert("El juego se creó correctamente")
    navigate('/home')


    navigate('/home')
  }


  return (
    <div>
      <div className='containerBoooton'>
        <button className='btnn' onClick={() => navigate('/home')}>Volver a Inicio</button>
      </div>
      <div className='created'>
      <div className='formContainer'>
      {console.log(state)}
      {/* {console.log(allPlatforms)} */}
      {/* {console.log(allPlatforms)} */}
        <form onSubmit={handlerSubmit}  >
          <label htmlFor="">Nombre:</label>
          <input name='name' onChange={handlerChange} type="text" />
          {error.name && <p className='parrafo'>{error.name}</p>}
          
          <label htmlFor="">Descripción:</label>
          <input name='description_raw' onChange={handlerChange} type="text" />
          {error.description_raw && <p className='parrafo'>{error.description_raw}</p>}
          
          <label htmlFor="">Plataformas:</label>
          <select onChange={handlerChange} name="parent_platforms" id="">
            {allPlatforms.map((platform) => (<option key={platform} value={platform} disabled={state.parent_platforms.includes(platform)}>{platform}</option>))}
          </select>
          {error.parent_platforms && <p className='parrafo'>{error.parent_platforms}</p>}
          
          <label htmlFor="">Imagen URL:</label>
          <input name='background_image' onChange={handlerChange} type="text" />
          {error.background_image && <p className='parrafo'>{error.background_image}</p>}
          
          <label htmlFor="">Fecha de lanzamiento:</label>
          <input name='released' onChange={handlerChange} type="date" />
          {error.released && <p className='parrafo'>{error.released}</p>}
          
          <label htmlFor="">Puntuación:</label>
          <input name='rating' onChange={handlerChange} type="number" min={1} max={5} />
          {error.rating && <p className='parrafo'>{error.rating}</p>}
          
          <label htmlFor="">Generos:</label>
          <select onChange={handlerChange} name="genres" id="">
            {allGenres.map(temp => <option key={temp} value={temp} disabled={state.genres.includes(temp)}>{temp}</option>)}
          </select>
          {error.genres && <p className='parrafo'>{error.genres}</p>}

          <button className='boton' disabled={disable()} type="submit"> Crear Juego </button>

        </form>
        </div>

        <div className='previewContainer'>
          <h2>Vista previa:</h2>
          <div className='previewForm'>
            <div className='contentImg'>
              <img src={state.background_image} alt="game" className='imgForm' />
            </div>
            <div className='contentDetail'>
              <h1 className='h1form'>{state.name}</h1>
              <h2><span className='span'>Plataforms:{" "}</span>{state.parent_platforms.join(', ')}</h2>
              <h2><span className='span'>Genres:{" "}</span>{state.genres.join(', ')}</h2>
              <h2><span className='span'>Released:{" "}</span>{state.released}</h2>
              <h2><span className='span'>Rating:{" "}</span>{state.rating}</h2>
              <p><span className='span'>Description:{" "}</span>{state.description_raw}</p>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Form