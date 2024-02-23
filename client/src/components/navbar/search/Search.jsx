import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVideogamesByName } from '../../../redux/actions'
import './Search.css'

const Search = () => {

    const dispatch = useDispatch()

    const [game, setGame] = useState("")

    const handlerChange = (event) => {
        setGame(event.target.value)
    }

    const handlerSubmit = (event) => {
        event.preventDefault()
        dispatch(getVideogamesByName(game))
        document.getElementById("search").value = ""
    }

    return (
    <div>
        <form className='containerSearch' onSubmit={handlerSubmit}>
            <input className='input' id='search' onChange={handlerChange} type="text" /><input className='btnt' type="submit" value="🔍" />
        </form>
    </div>
    )
}

export default Search