import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { filterByCreation, filterByGenre, orderByName, orderByRating, resetVideogames } from '../../redux/actions';

const Filters = ({ genres }) => {

    const [selectedCreation, setSelectedCreation] = useState('all');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [selectedNameOrder, setSelectedNameOrder] = useState('all');
    const [selectedRatingOrder, setSelectedRatingOrder] = useState('all');

    const dispatch = useDispatch();

    const handleChangeByGenres = (event) => {
        setSelectedGenre(event.target.value);
        dispatch(filterByGenre(event.target.value));
    }

    const handleChangeByCreation = (event) => {
        setSelectedCreation(event.target.value);
        dispatch(filterByCreation(event.target.value));
    }

    const handleChangeByName = (event) => {
        setSelectedNameOrder(event.target.value);
        dispatch(orderByName(event.target.value));
    }

    const handleChangeByRating = (event) => {
        setSelectedRatingOrder(event.target.value);
        dispatch(orderByRating(event.target.value));
    } 

    const handleReset = () => {
        setSelectedCreation('all');
        setSelectedGenre('all');
        setSelectedNameOrder('all');
        setSelectedRatingOrder('all');
        dispatch(resetVideogames());
    }

    return (
        <div className="filters_container">

            <h2>Filters</h2>

            <div className="filters_created">
                <label htmlFor="videogames">Videogames</label>
                <select name="filterByCreation" id="videogames" onChange={handleChangeByCreation} value={selectedCreation}>
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="created">Created</option>
                </select>
            </div>

            <div className="filters_genres">
                <label htmlFor="genres">Genres</label>
                <select name="filterByGenre" id="genres" onChange={handleChangeByGenres} value={selectedGenre}>
                    <option value="all" disabled hidden >Genre</option>
                    {
                        genres?.map((genre) => {
                            return(
                                <option key={genre} value={genre}>{genre}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="filters_orderByName"> 
                <label htmlFor="orderByName">Order by Name</label>
                <select name="orderByName" id="orderByName" onChange={handleChangeByName} value={selectedNameOrder}>
                    <option value="all" disabled hidden >Alphabethic</option>
                    <option value="ascending">A-Z</option>
                    <option value="descending">Z-A</option>
                </select>
            </div>

            <div className="filters_orderByRating">
                <label htmlFor="orderByRating">Order by Rating</label>
                <select name="orderByRating" id="orderByRating" onChange={handleChangeByRating} value={selectedRatingOrder}>
                    <option value="all" disabled hidden >Rating</option>
                    <option value="ascending">Min</option>
                    <option value="descending">Max</option>
                </select>
            </div>

            <button onClick={handleReset} className="reset_all">Reset All</button>
        </div>
    );
}

Filters.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.string)
};

export default Filters;
