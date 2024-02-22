const axios = require('axios')


const { Genre } = require('../db')


const URL = 'https://api.rawg.io/api/genres'
const { API_KEY } = process.env

const getAllGenres = async () => {
    const genresDB = await Genre.findAll()
    if(!genresDB.length){
        const data = await axios.get(`${URL}?key=${API_KEY}`)
        const genres = await data.data.results.map((gen) => gen.name)
        genres.forEach((gen) => Genre.findOrCreate({
            where: {name: gen}
        }))
        return genres
    } else {
        const resp = []
        genresDB.map((gen) => resp.push(gen.name))
        return resp
    }
}

module.exports = { getAllGenres }