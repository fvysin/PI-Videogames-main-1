import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter, getGenres } from '../../../redux/actions';
import './FilterGenres.css'

const FilterGenres = () => {
    const dispatch = useDispatch()
    const [select, setSelect] = useState('')

    useEffect(() => {
        dispatch(getGenres())
        setSelect('all')
    }, [dispatch])

    const allGenres = useSelector(state => state.allGenres)

    const handlerFilter = (event) => {
        setSelect(event.target.value);
        dispatch(updateFilter('genre', event.target.value));
    }
  

    return (
        <div className='container'>
            {console.log(select)} 
            <select name="genres" id="genres" onChange={handlerFilter} value={select}>
                
            <option value="all">Género</option>
                {allGenres.map(temp => <option key={temp} value={temp}>{temp}</option>)}
            </select>
          
        </div>
    )
}

export default FilterGenres