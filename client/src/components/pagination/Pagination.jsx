import React, { useState } from 'react'
import './Pagination.css'

const Pagination = ({ pagina, setPagina, maximo }) => {
    const [input, setInput] = useState(1)

    const nextPage = () => {
        setInput(input + 1)
        setPagina(pagina + 1)
    }

    const previousPage = () => {
        setInput(input - 1)
        setPagina(pagina - 1)
    }

    const onKeyDown = (event) => {
        if (event.keyCode === 13) {
            setPagina(parseInt(event.target.value));
            if (
                parseInt(event.target.value < 1) ||
                parseInt(event.target.value) > Math.ceil(maximo) ||
                isNaN(parseInt(event.target.value))
            ) {
                setPagina(1);
                setInput(1);
            } else {
                setPagina(parseInt(event.target.value));
            }
        }
    }

    const onChange = (event) => {
        setInput(event.target.value);
    }

    let m = Math.ceil(maximo)
    return (
        <div className='pgContainer' >
            {console.log(m)}
            <button disabled={pagina === 1 || pagina < 1} onClick={previousPage} className='pgBoton' > ◀️ </button>
            <input onChange={(event) => onChange(event)} onKeyDown={(event) => onKeyDown(event)} name='page' autoComplete='off' value={input} className='pgInput'/>
            <p className='pgP'> de {m} paginas </p>
            <button disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={nextPage} className='pgBoton'> ▶️ </button>
        </div>
    )
}

export default Pagination