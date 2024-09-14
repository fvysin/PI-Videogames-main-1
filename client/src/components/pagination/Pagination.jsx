// import React, { useState, useEffect } from 'react'
// // import { useSelector } from 'react-redux'
// import './Pagination.css'

// const Pagination = ({ pagina, setPagina, maximo }) => {
//     const [input, setInput] = useState(1)
//     // const currentPageNumber = useSelector(state => state.currentPageNumber);

//     const nextPage = () => {
//         setInput(input + 1)
//         setPagina(pagina + 1)
//     }

//     const previousPage = () => {
//         setInput(input - 1)
//         setPagina(pagina - 1)
//     }

//     useEffect(() => {
//         setInput(pagina);
//     }, [pagina]);


//     const onKeyDown = (event) => {
//         if (event.keyCode === 13) {
//             setPagina(parseInt(event.target.value));
//             if (
//                 parseInt(event.target.value < 1) ||
//                 parseInt(event.target.value) > Math.ceil(maximo) ||
//                 isNaN(parseInt(event.target.value))
//             ) {
//                 setPagina(1);
//                 setInput(1);
//             } else {
//                 setPagina(parseInt(event.target.value));
//             }
//         }
//     }

//     const onChange = (event) => {
//         setInput(event.target.value);
//     }

//     let m = Math.ceil(maximo)

    
//     return (
//         <div className='pgContainer' >
//             {/* {console.log(m)} */}
//             <button 
//             disabled={pagina === 1 || pagina < 1} 
//             onClick={previousPage} 
//             className='pgBoton' > ◀️ 
//             </button>
     
//             <input 
//             onChange={(event) => onChange(event)} 
//             onKeyDown={(event) => onKeyDown(event)} 
//             name='page' 
//             autoComplete='off' 
//             value={input} 
//             className='pgInput'
//             />

//             <p className='pgP'> de {m} paginas </p>
//             <button 
//             disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} 
//             onClick={nextPage} 
//             className='pgBoton'> ▶️ 
//             </button>
//         </div>
//     )
// }

// export default Pagination


import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Paging = ({ handlePagination }) => {
    const currentPage = useSelector((state) => state.currentPageNumber);
    const allVideogamesBackUp = useSelector((state) => state.allVideogamesBackUp);
    const videogamesFiltered = useSelector((state) => state.videogamesFiltered);
    const filters = useSelector((state) => state.filters);

    let totalPages;

    if(filters) {
        totalPages = Math.ceil(videogamesFiltered.length / 15);
    } else {
        totalPages = Math.ceil(allVideogamesBackUp.length / 15);
    }

    return (
        <div className='pgContainer' >
        <button name="prev" onClick={(event) => handlePagination(event)}>Prev</button>
            <p>{currentPage + 1} de {totalPages}</p>
            <button name="next" onClick={(event) => handlePagination(event)}>Next</button>
        </div>
    );
}

Paging.propTypes = {
    handlePagination: PropTypes.func
}

export default Paging;