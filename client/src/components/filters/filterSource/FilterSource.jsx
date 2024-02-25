import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../../redux/actions';
import './FilterSource.css'

const FilterSource = () => {
    const dispatch = useDispatch()
    const [filterSource, setFilterSource] = useState('all')

    const handlerSource = (event) => {
        const source = event.target.value;
        setFilterSource(source)
        dispatch(updateFilter('source',source))
    }

    useEffect(() => {
        setFilterSource('all');
    }, []);

    return (
        
    <div>
        {/* {console.log(filterSource)} */}
        <select name="source" id="source"  onChange={handlerSource} value={filterSource}>
            <option value="all">Origen</option>
            <option value="API">API</option>
            <option value="DB">DB</option>
        </select>
    </div>
    )
}

export default FilterSource