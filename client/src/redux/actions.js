import { CLEAR_DETAIL, GET_DETAIL, GET_VIDEOGAMES, GET_BY_NAME, POST_VIDEOGAME, GET_GENRES, FILTER, RESET } from "./actionsType"
import axios from 'axios'

export const  allVideogames = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/videogames')
            const responseData= response.data
            dispatch({
                type: GET_VIDEOGAMES,
                payload: responseData
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
            const responseData= response.data
            dispatch({
                type: GET_DETAIL,
                payload: responseData
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

export const  getVideogamesByName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            const responseData= response.data
            dispatch({
                type: GET_BY_NAME,
                payload: responseData
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
            const responseData= response.data
            dispatch({
                type: POST_VIDEOGAME,
                payload: responseData
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
            const responseData= response.data
            dispatch({
                type: GET_GENRES,
                payload: responseData
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