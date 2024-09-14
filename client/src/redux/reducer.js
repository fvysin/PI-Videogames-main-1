


import { GET_VIDEOGAMES, GET_GENRES, GET_DETAIL, CLEAR_DETAIL, GET_BY_NAME, FILTER, RESET,PAGINATE, RESET_PAGE, ORDER_BY_NAME, ORDER_BY_RATING, FILTER_BY_CREATION, FILTER_BY_GENRE } from "./actions-type";

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

        // case FILTER:
        //     const { filterType, value} = action.payload;
        //     let filters = { ...state.filters, [filterType]: value };
        //     let filteredResult = [...state.allVideogamesBackUp];

        //     // Filtrar por género
        //     if (filters.genre && filters.genre !== 'all') {
        //         filteredResult = filteredResult.filter((game) => game.genres.includes(filters.genre));
        //     }

            
        //     // Filtrar por valoración
        //     if (filters.rating && filters.rating !== 'all') {
        //         filteredResult = filteredResult.filter((game) => game.rating === filters.rating);
        //     }
            
        //     // Filtrar por origen
        //     if (filters.source && filters.source !== 'all') {
        //         if (filters.source === 'API') {
        //             filteredResult = filteredResult.filter((game) => !game.createdDB);
        //         } else if (filters.source === 'DB') {
        //             filteredResult = filteredResult.filter((game) => game.createdDB);
        //         }
        //     }
        //     // Aplicar ordenamiento
        //     if (filters.order === 'AscendenteNombre') {
        //         filteredResult.sort((a, b) => a.name.localeCompare(b.name));
        //     } else if (filters.order === 'DescendenteNombre') {
        //         filteredResult.sort((a, b) => b.name.localeCompare(a.name));
        //     }

        //     return {
        //         ...state,
        //         allVideogames: filteredResult,
        //         currentPageNumber: 0, 
        //         filters:false
        //     }

        case FILTER_BY_GENRE: {
            const allVideogames = state.filters ? [...state.videogamesFiltered] : [...state.allVideogamesBackUp];

            const filteredByGenre = allVideogames.filter((videogame) => videogame.genres.includes(action.payload));

            if(!filteredByGenre.length) {
                return {
                    ...state
                }
            }

            return {
                ...state,
                videogames: [...filteredByGenre].splice(0, cardsPerPage),
                videogamesFiltered: filteredByGenre,
                currentPageNumber: 0,
                filters: true
            }
        }

        case FILTER_BY_CREATION: {

            let allVideogames = [...state.allVideogamesBackUp];

            let filteredByCreation;
        
            if (action.payload === 'created') {
                filteredByCreation = allVideogames.filter((videogame) => typeof videogame.id === 'string');
                
                if(!filteredByCreation.length) {
                    return {
                        ...state
                    }
                }
            }
        
            if (action.payload === 'available') {
                filteredByCreation = allVideogames.filter((videogame) => typeof videogame.id === 'number');
            }

            if(action.payload === 'all') {
                filteredByCreation = allVideogames;
            }
        
            return {
                ...state,
                allVideogames: [...filteredByCreation].splice(0, cardsPerPage),
                videogamesFiltered: filteredByCreation,
                currentPageNumber: 0,
                filters: true
            }

        }

        case ORDER_BY_NAME: {
            const allVideogames = state.filters ? [...state.videogamesFiltered] : [...state.allVideogamesBackUp];

            let orderName;

            if (action.payload === 'ascending') {
                orderName = allVideogames.sort((a, b) => (a.name > b.name) ? 1 : -1);
            }
        
            if (action.payload === 'descending') {
                orderName = allVideogames.sort((a, b) => (a.name < b.name) ? 1 : -1);
            }

            return {
                ...state,
                allVideogames: [...orderName].splice(0, cardsPerPage),
                videogamesFiltered: orderName,
                currentPageNumber: 0,
                filters: true          
            }
        }

        case ORDER_BY_RATING: {
            const allVideogames = state.filters ? [...state.videogamesFiltered] : [...state.videogamesBackUp];

            let orderRating;

            if(action.payload === 'ascending') {
                orderRating = allVideogames.sort((a, b) => a.rating - b.rating);
            }

            if(action.payload === 'descending') {
                orderRating = allVideogames.sort((a, b) => b.rating - a.rating);
            }

            return {
                ...state,
                allVideogames: [...orderRating].splice(0, cardsPerPage),
                videogamesFiltered: orderRating,
                currentPageNumber: 0,
                filters: true,         
            }
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
