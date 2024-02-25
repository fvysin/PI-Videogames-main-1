import React from 'react'
import { useDispatch } from "react-redux"
import { resetVideogames } from '../../../redux/actions';
import './Reset.css'
import { useState } from 'react';

const Reset = () => {
    const dispatch = useDispatch();
    const [pagina, setPagina] = useState(1)

    const handlerReset = () => {
        dispatch(resetVideogames());
        setPagina(1)
    }
     
    
    return (
        <div>
            <button className='btn'pagina={pagina} onClick={handlerReset}>Reset</button>
        </div>
    )
}



export default Reset