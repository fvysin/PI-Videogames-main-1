const axios = require('axios');
const { Genre } = require('../db');

const URL = 'https://api.rawg.io/api/genres';
const { API_KEY } = process.env;

const getAllGenres = async () => {
    const genresDB = await Genre.findAll();

    if (!genresDB.length) {
        const data = await axios.get(`${URL}?key=${API_KEY}`);
        const genres = await data.data.results.map((gen) => gen.name);
        genres.forEach(async (gen) => {
            await Genre.findOrCreate({
                where: { name: gen }
            });
        });
        genres.sort();
        return genres;
    } else {
        const resp = genresDB.map((gen) => gen.name);
        resp.sort();
        return resp;
    }
};

module.exports = { getAllGenres };
