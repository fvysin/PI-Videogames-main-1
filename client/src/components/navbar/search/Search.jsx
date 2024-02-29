// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { getVideogamesByName } from '../../../redux/actions'
// import './Search.css'

// const Search = () => {

//     const dispatch = useDispatch()

//     const [game, setGame] = useState("")

//     const handlerChange = (event) => {
//         setGame(event.target.value)
//     }

//     const handlerSubmit = (event) => {
//         event.preventDefault()
//         dispatch(getVideogamesByName(game))
//         document.getElementById("search").value = ""
//     }

//     return (
//     <div>
//         <form className='containerSearch' onSubmit={handlerSubmit}>
//             <input className='input' id='search' onChange={handlerChange} type="text" /><input className='btnt' type="submit" value="🔍" />
//         </form>
//     </div>
//     )
// }

// export default Search

import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from '../../../redux/actions';
import './Search.css'

export const Search = () => {
    const [inputSearch, setInputSearch] = useState('');

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setInputSearch(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputSearch !== '') {
            dispatch(getVideogamesByName(inputSearch));
            setInputSearch('');
        }
    }

    const handleKyeDown = (event) => {
        if(event.keyCode === 13 && inputSearch !== '') {
            dispatch(getVideogamesByName(inputSearch));
            setInputSearch('');
        }
    }

    return (
        <div className='containerSearch'>
            <input 
                type="search" 
                id="searchGame"
                name="searchGame" 
                value={inputSearch} 
                onChange={handleChange}  
                placeholder="buscar.."
                onKeyDown={handleKyeDown}
            />
            <button type="submit" onClick={handleSubmit}>🔍</button>
        </div>
    );
}

export default Search;
