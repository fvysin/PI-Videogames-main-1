import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/actions';

const Ratings = () => {
    const dispatch = useDispatch()

    const [orderRating, setOrderRating] = useState('')

    const handlerRating = (event) => {
        const rating = event.target.value;
        setOrderRating(rating)
        dispatch(updateFilter("rating", rating));
    }

    return (
        <div>
            <select name="Rating" id="Rating" onChange={handlerRating} value={orderRating}>
                <option value="">Por Valoración</option>
                <option value="AscRating">Con mayor Valoración</option>
                <option value="DescRating">Con menos Valoración</option>
            </select>
        </div>
    ) 
}

export default Ratings