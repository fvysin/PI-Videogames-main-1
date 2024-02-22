import { GET_VIDEOGAMES, GET_GENRES, GET_DETAIL, CLEAR_DETAIL, SEARCH_VIDEOGAME, FILTER, RESET } from "./actionsType"

let initialState = {
    allVideogames: [],
    allVideogamesBackUp: [],
    allGenres: [],
    detail: {},
    filters: {
        genre: '',     
        order: 'name',  
        rating: '', 
        source: ''
    }
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){

        case GET_VIDEOGAMES:
            return {
                ...state,
                allVideogames: [...action.payload],
                allVideogamesBackUp: [...action.payload]
            }

        case GET_GENRES:
            return {
                ...state,
                allGenres: action.payload
            }    

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        case CLEAR_DETAIL:
            return {
                ...state,
                detail: {}
            }

        case SEARCH_VIDEOGAME:
            return {
                ...state,
                allVideogames: action.payload
            }   

        case FILTER:
            const { filterType, value} = action.payload
        
            let filters = { ...state.filters, [filterType]: value }
            let filteredResult = [...state.allVideogamesBackUp]
        
            if(filters.source === 'API'){
                filteredResult = filteredResult.filter((game)=> game.createdDB === false )
            }else if(filters.source === 'DB'){
                filteredResult = filteredResult.filter((game)=> game.createdDB === true )
            }

            if (filters.genre) {
                filteredResult = filteredResult.filter((game) =>
                    game.genres.includes(filters.genre)
                )
            }

            if (filters.order === "AscendenteNombre") {
                filteredResult.sort((a, b) => a.name.localeCompare(b.name))
            }
            if (filters.order === "DescendenteNombre") {
                filteredResult.sort((a, b) => b.name.localeCompare(a.name))
            }
            
            if (filters.rating === "AscRating") {
                filteredResult.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            }
            if (filters.rating === "DescRating") {
                filteredResult.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating))
            }

            return {
                ...state,
                allVideogames: filteredResult,
                filters: filters,
            }

        case RESET:
        return {
            ...state,
            allVideogames: state.allVideogamesBackUp,
        }
        
        default: 
            return state
    }
}

export default rootReducer