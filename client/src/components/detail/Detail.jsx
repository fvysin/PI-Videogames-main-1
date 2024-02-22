import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { clearDetail, getVideogameById } from '../../redux/actions'
import './Detail.css'
import Footer from '../footer/Footer'

const Detail = () => {

  const navigate = useNavigate()

  const params = useParams()

  const detail = useSelector(state => state.detail)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVideogameById(params.id))

    return () => {
      dispatch(clearDetail())
    }

  }, [])

  return (
    <div className=''>
      <div className='contBot'>
        <button className='btnn' onClick={() => navigate('/home')}>Volver</button>
      </div>
      <div className='containerDetail'>
        <div className='detail'>
        <img className='img' src={detail.background_image} alt='' />
        <h1 className='name'>{detail.name}</h1>
        <h2 className='parent_platforms'><span className='span'>Plataforms:{" "}</span>{detail.parent_platforms}</h2>
        <h2 className='genres'><span className='span'>Genres:{" "}</span>{detail.genres}</h2>
        <h2 className='released'><span className='span'>Released:{" "}</span>{detail.released}</h2>
        <h2 className='rating'><span className='span'>Rating:{" "}</span>{detail.rating}</h2>
        <p className='description_raw'><span className='span'>Description:{" "}</span>{detail.description_raw}</p>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Detail
