// // Cards.jsx
// import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import Card from '../card/Card'
// import './Cards.css'
// import Pagination from '../pagination/Pagination'
// import { usePagination } from '../PaginationContext'
// import { useDispatch } from 'react-redux'
// import { allVideogames } from '../../redux/actions'
// import Loading from '../loading/Loading'

// const Cards = () => {
//   const [loading, setLoading] = useState(true)
//   const dispatch = useDispatch()
//   const { pagina, setPagina } = usePagination(); 

//   const [searchValue, setSearchValue]= useState("")


//   const handleHomeClick = () => {
//     // Limpiar el término de búsqueda al hacer clic en "Home"
//     setSearchValue("");
//     dispatch(allVideogames());
//     setPagina(1);
//   };



//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(allVideogames());
//       setLoading(false);
//     };
  
//     fetchData()
//   }, [dispatch])

//   const allVideogame = useSelector(state => state.allVideogames)
//   const [porPagina] = useState(15)
//   const maximo = allVideogame.length / porPagina

//   return (
//     <div>
//       {loading ? (
//         <div className='cardsContainerLoader'>
//           {Array.from(new Array(10)).map((item, index) => <Loading key={index} />)}
//         </div>
//       ) : (
//         <div>
//           <div className='cardsContainer'>
//             {allVideogame.slice(
//               (pagina - 1) * porPagina,
//               (pagina - 1) * porPagina + porPagina
//             ).map(game => 
//             <Card key={game.id} info={game}/>)}
//           </div>
//           <div className='paginationContainer'>
//             <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} onClick={handleHomeClick}/>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Cards
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { allVideogames, getAllGenres, paginate } from '../../redux/actions';

// Components
import Card from "../card/Card";
import Nav from '../navbar/Nav';
import Filters from '../filters/Filters';


const Cards = () => {

    const allVideogamesState = useSelector((state) => state.allVideogames);

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.getAllGenres);

    useEffect(() => {
        if(!allVideogamesState || !allVideogamesState.length) {
            dispatch(allVideogames());
        }
        dispatch(getAllGenres());
    }, [dispatch, allVideogamesState]);


    const handlePagination = (event) => {
        dispatch(paginate(event.target.name));
    }

    const handleClick = () => {
        dispatch(allVideogames());
    }

 
    return (
        allVideogamesState && allVideogamesState.length ?

        <div className='cardsContainerLoader'>

            <Nav handleClick={handleClick} handlePagination={handlePagination}/>

            <div className='paginationContainer'>
                <Filters genres={genres}/>

            <div className='paginationContainer'>
            {   
                    allVideogamesState?.map((videogame) => {
                        return(
                            <Card 
                            key={videogame.id}
                            id={videogame.id}
                            name={videogame.name}
                            background_image={videogame.background_image}
                            genres={videogame?.genres?.join(' | ')}
                            rating={videogame.rating}
                            />
                            )
                        })
                    } 
                    </div>
                </div>

            </div>

   :"error" );
}

export default Cards; 

