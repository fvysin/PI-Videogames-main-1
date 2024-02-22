import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/actions';

const Order = () => {
    const dispatch = useDispatch();

    const [orderName, setOrdenName] = useState('')

    const handleOrder = (event) => {
    const order = event.target.value;
        setOrdenName(order)
        dispatch(updateFilter("order", order));
    }

    return (
        <div>
            <select name="order" id="order" onChange={handleOrder} value={orderName}>
                <option value="">Por Orden</option>
                <option value="AscendenteNombre">A-Z{" "}</option>
                <option value="DescendenteNombre">Z-A{" "}</option>
            </select>
        </div>
    )
}

export default Order