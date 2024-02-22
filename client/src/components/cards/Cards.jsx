import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Card from '../card/Card'
import './Cards.css'
import Pagination from '../pagination/Pagination'
import { useDispatch } from 'react-redux'
import { allVideogames } from '../../redux/actions'
import Loading from '../loading/Loading'

const Cards = () => {

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(allVideogames());
      setLoading(false);
    };
  
    fetchData()
  }, [dispatch])

  const allVideogame = useSelector(state => state.allVideogames)

  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(15)

  const maximo = allVideogame.length / porPagina

  return (
    <div >
      {loading ? (
        <div className='cardsContainerLoader'>
          {Array.from(new Array(10)).map((item) => <Loading key={item} />)}
        </div>
      ) : (
        <div>
          <div className='cardsContainer'>
            {allVideogame.slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            ).map(game => <Card info={game}/>)}
          </div>
        <div className='paginationContainer'>
          <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
      </div>
      )}
    </div>
  )
}

export default Cards