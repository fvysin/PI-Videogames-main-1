import React from 'react'
import { useDispatch } from "react-redux"
import { resetVideogames } from "../../redux/actions";
import './Reset.css'

const Reset = () => {
    const dispatch = useDispatch();

    const handlerReset = () => {
        dispatch(resetVideogames());
    }   
    
    return (
        <div>
            <button className='btn' onClick={handlerReset}>Reset</button>
        </div>
    )
}



export default Reset