


import { GET_VIDEOGAMES, GET_GENRES, GET_DETAIL, CLEAR_DETAIL, GET_BY_NAME, FILTER, RESET,PAGINATE, RESET_PAGE } from "./actions-type";

const initialState = {
    allVideogames: [],
    allVideogamesBackUp: [],
    allGenres: [],
    detail: {},
    currentPageNumber: 0, 
    videogamesFiltered: [],
    filters: false
        // genre: '',     
        // order: 'name',  
        // rating: '', 
        // source: ''
    
}

const rootReducer = (state = initialState, action) => {
    const cardsPerPage=15;
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
                currentPageNumber: 0, 
                filters:false
            }

        case RESET:
            return {
                ...state,
                allVideogames: [...state.allVideogamesBackUp],
                currentPageNumber: 1, 
                filters: false,
                videogamesFiltered:[]
                // { 
                    // genre: 'all',     
                    // order: 'name',  
                    // rating: 'all', 
                    // source: 'all'
                    
                // }
            }
            case RESET_PAGE:
                return {
                    ...state,
                    currentPageNumber: 1, // Restablecer la página a 1
                };
            
        
            case PAGINATE:
            const next_page = state.currentPage + 1;
            const prev_page = state.currentPage - 1;
            const FirstIndex = action.payload === "next" ? next_page * cardsPerPage : prev_page * cardsPerPage;
        
            if (state.filters) {
                if (action.payload === "next" && FirstIndex >= state.videogamesFiltered.length) return state;
                else if (action.payload === "prev" && prev_page < 0) return state;

                return {
                    ...state,
                    allVideogames: [...state.videogamesFiltered].splice(FirstIndex, cardsPerPage),
                    currentPage: action.payload === "next" ? next_page : prev_page,
                    currentPageNumber: action.payload === "next" ? state.currentPageNumber + 1 : state.currentPageNumber - 1
                };
            }
        
            if (action.payload === "next" && FirstIndex >= state.allVideogamesBackUp.length) return state;
            else if (action.payload === "prev" && prev_page < 0) return state;
        
            return {
                ...state,
                allVideogames: [...state.allVideogamesBackUp].splice(FirstIndex, 15),
                currentPage: action.payload === "next" ? next_page : prev_page,
                currentPageNumber: action.payload === "next" ? state.currentPageNumber + 1 : state.currentPageNumber - 1
            };
        default: 
            return state
    }
}

export default rootReducer;
