import React from 'react'
import { useDispatch } from "react-redux"
import { resetVideogames } from '../../../redux/actions';
import './Reset.css'

const Reset = () => {
    const dispatch = useDispatch();

    const handlerReset = (e) => {
        dispatch(resetVideogames(e.target.name));
    }   
    
    return (
        <div>
            <button className='btn' onClick={handlerReset}>Reset</button>
        </div>
    )
}



export default Reset