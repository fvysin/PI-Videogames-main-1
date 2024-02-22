import { CLEAR_DETAIL, GET_DETAIL, GET_VIDEOGAMES, SEARCH_VIDEOGAME, POST_VIDEOGAME, GET_GENRES, FILTER, RESET } from "./actionsType"
import axios from 'axios'

export const  allVideogames = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/videogames')
            dispatch({
                type: GET_VIDEOGAMES,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const  getVideogameById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/videogames/${id}`)
            dispatch({
                type: GET_DETAIL,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const  clearDetail = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CLEAR_DETAIL
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const  searchVideogame = (game) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${game}`)
            dispatch({
                type: SEARCH_VIDEOGAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const  postVideogame = (state) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3001/videogames', state)
            dispatch({
                type: POST_VIDEOGAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const  getGenres = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/genres')
            dispatch({
                type: GET_GENRES,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const  updateFilter = (filterType, value) => {
    return {
        type: FILTER,
        payload: { filterType, value }
    }
}

export const  resetVideogames = () => {
    return {
        type: RESET,
    }
}