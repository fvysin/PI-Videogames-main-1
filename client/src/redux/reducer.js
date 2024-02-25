// import { GET_VIDEOGAMES, GET_GENRES, GET_DETAIL, CLEAR_DETAIL, GET_BY_NAME, FILTER, RESET } from "./actionsType"

// let initialState = {
//     allVideogames: [],
//     allVideogamesBackUp: [],
//     allGenres: [],
//     detail: {},
//     filters: {
//         genre: '',     
//         order: 'name',  
//         rating: '', 
//         source: ''
//     }
// }

// const rootReducer = (state = initialState, action) => {
//     switch(action.type){

//         case GET_VIDEOGAMES:
//             return {
//                 ...state,
//                 allVideogames: [...action.payload],
//                 allVideogamesBackUp: [...action.payload]
//             }

//         case GET_GENRES:
//             return {
//                 ...state,
//                 allGenres: action.payload
//             }    

//         case GET_DETAIL:
//             return {
//                 ...state,
//                 detail: action.payload
//             }

//         case CLEAR_DETAIL:
//             return {
//                 ...state,
//                 detail: {}
//             }

//         case GET_BY_NAME:
//             return {
//                 ...state,
//                 allVideogames: action.payload
//             }   

//         case FILTER:
//             const { filterType, value} = action.payload
        
//             let filters = { ...state.filters, [filterType]: value }
//             let filteredResult = [...state.allVideogamesBackUp]
        
//             //origin
//             if(filters.source === 'API'){
//                 filteredResult = filteredResult.filter((game)=> game.createdDB === false )
//             }else if(filters.source === 'DB'){
//                 filteredResult = filteredResult.filter((game)=> game.createdDB === true )
//             }
//             //genre
//             if (filters.genre) {
//                 filteredResult = filteredResult.filter((game) =>
//                     game.genres.includes(filters.genre)
//                 )
//             }
//             //order
//             if (filters.order === "AscendenteNombre") {
//                 filteredResult.sort((a, b) => a.name.localeCompare(b.name))
//             }
//             if (filters.order === "DescendenteNombre") {
//                 filteredResult.sort((a, b) => b.name.localeCompare(a.name))
//             }
//             //rating
//             if (filters.rating === "AscRating") {
//                 filteredResult.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
//             }
//             if (filters.rating === "DescRating") {
//                 filteredResult.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating))
//             }

//             return {
//                 ...state,
//                 allVideogames: filteredResult,
//                 filters: filters,
//             }

//         case RESET:
//         return {
//             ...state,
//             allVideogames: [...state.allVideogamesBackUp],

//             filters: { 
//                 genre: "all",     
//                 order: 'name',  
//                 rating: "all", 
//                 source: "all"
//             }
//             // detail: action.payload
//         }
        
//         default: 
//             return state
//     }
// }

// export default rootReducer






// rootReducer.js





import { GET_VIDEOGAMES, GET_GENRES, GET_DETAIL, CLEAR_DETAIL, GET_BY_NAME, FILTER, RESET } from "./actionsType";

const initialState = {
    allVideogames: [],
    allVideogamesBackUp: [],
    allGenres: [],
    detail: {},
    currentPageNumber: 1, // Cambiar a currentPageNumber
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

        case GET_BY_NAME:
            return {
                ...state,
                allVideogames: action.payload
            }   

        case FILTER:
            const { filterType, value} = action.payload;
            let filters = { ...state.filters, [filterType]: value };
            let filteredResult = [...state.allVideogamesBackUp];

            // Filtrar por género
            if (filters.genre && filters.genre !== 'all') {
                filteredResult = filteredResult.filter((game) => game.genres.includes(filters.genre));
            }

            // Aplicar ordenamiento
            if (filters.order === 'AscendenteNombre') {
                filteredResult.sort((a, b) => a.name.localeCompare(b.name));
            } else if (filters.order === 'DescendenteNombre') {
                filteredResult.sort((a, b) => b.name.localeCompare(a.name));
            }

            // Filtrar por valoración
            if (filters.rating && filters.rating !== 'all') {
                filteredResult = filteredResult.filter((game) => game.rating === filters.rating);
            }

            // Filtrar por origen
            if (filters.source && filters.source !== 'all') {
                if (filters.source === 'API') {
                    filteredResult = filteredResult.filter((game) => !game.createdDB);
                } else if (filters.source === 'DB') {
                    filteredResult = filteredResult.filter((game) => game.createdDB);
                }
            }

            return {
                ...state,
                allVideogames: filteredResult,
                filters: filters,
                currentPageNumber: 1 // Cambiar a currentPageNumber
            }

        case RESET:
            return {
                ...state,
                allVideogames: [...state.allVideogamesBackUp],
                currentPageNumber: 1, // Cambiar a currentPageNumber
                filters: { 
                    genre: 'all',     
                    order: 'name',  
                    rating: 'all', 
                    source: 'all'
                }
            }
        
        default: 
            return state
    }
}

export default rootReducer;
