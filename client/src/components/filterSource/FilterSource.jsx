import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/actions';
import './FilterSource.css'

const FilterSource = () => {
    const dispatch = useDispatch()
    const [filterSource, setFilterSource] = useState('')

    const handlerSource = (event) => {
        const source = event.target.value;
        setFilterSource(source)
        dispatch(updateFilter('source',source))
    }
    return (
        
    <div>
        {/* {console.log(filterSource)} */}
        <select name="source" id="source"  onChange={handlerSource} value={filterSource}>
            <option value="">Todos</option>
            <option value="API">API</option>
            <option value="DB">DB</option>
        </select>
    </div>
    )
}

export default FilterSource