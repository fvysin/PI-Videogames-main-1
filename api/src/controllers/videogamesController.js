const axios = require('axios')


const { Videogame, Genre } = require('../db')

//https://api.rawg.io/api/games?key=80be86f9ad474b6ca09f2bea0a2ff3e2

const URL = 'https://api.rawg.io/api/games'
const { API_KEY } = process.env

const getVideogamesAPI = async () => {
    const allGames = []
    let page = 1
    while (page <= 9) {
        let apiData = await axios.get(`${URL}?key=${API_KEY}&page=${page}`)

        apiData.data.results.map((game) => {
            allGames.push({
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                rating: game.rating,
                parent_platforms: game.parent_platforms.map(item => item.platform.name).join(', '),
                genres: game.Genres.map((obj) => obj.name),
                createdDB: false
            })
            
        })
        // console.log(apiData.data.results);
        page++
    }
    return allGames
}

const getVideogamesDB = async () => {
    const videogamesDB = await Videogame.findAll({
        include: [{
            model: Genre,
            attribute: ["name"],
            through: {
                attributes: [],
            },
        }]
    })

    const result = videogamesDB.map((game) => ({
        id: game.id,
        name: game.name,
        description_raw: game.description_raw,
        parent_platforms: game.parent_platforms.join(', '),
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        createdDB: game.createdDB,
        genres: game.Genres.map((obj) => obj.name)
    }))
    // console.log(result)
    return result
}

const getAllVideogames = async () => {
    const gamesAPI = await getVideogamesAPI()
    const gamesDB = await getVideogamesDB()
    const allVideogames = [...gamesDB, ...gamesAPI]
    return allVideogames
}



const createVideogameDB = async (name, description_raw, parent_platforms, background_image, released, rating, genres) => {
    const gameDB = await Videogame.findAll({ 
        where: { 
            name: name 
        }});
    if (gameDB.length != 0) {
        throw new Error(`${name} ya existe en la Base de Datos`);
    }
    
    const newGame = await Videogame.create({
        name,
        description_raw,
        parent_platforms,
        background_image,
        released,
        rating
    });

    const genresDB = await Genre.findAll({
        where: { 
            name: genres 
        }
    });

    await newGame.addGenres(genresDB);

    return newGame;
};



const getVideogamesByName = async (name) => {
    const allVideogames = await getAllVideogames()
    const gameFiltered = allVideogames.filter((game) => game.name.toLowerCase().includes(name.toLowerCase()))
    if(!gameFiltered.length) {
        throw Error(`No se encontraron resultados con el nombre: ${name}`)
    }
    return gameFiltered.slice(0, 15)
}

const getVideogameById = async (id, source) => {
    if(source === 'api'){
        const respID = await axios.get(`${URL}/${id}?key=${API_KEY}`)
        
        const gameID = {
            id: respID.data.id,
            name: respID.data.name,
            description_raw: respID.data.description_raw,
            parent_platforms: respID.data.parent_platforms.map(item => item.platform.name).join(', '),
            background_image: respID.data.background_image,
            released: respID.data.released,
            rating: respID.data.rating,
            genres: respID.Genres.map((obj) => obj.name),
            createdDB: false
        }
        return gameID
    } else {
        const gameID = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],
                through : {
                    attributes: [],
                }
            }]
        })
        let result = gameID.Genres.map((gen) => gen.name)
        let game = {
            id: gameID.id,
            name: gameID.name,
            description_raw: gameID.description_raw,
            parent_platforms: gameID.parent_platforms.join(', '),
            background_image: gameID.background_image,
            released: gameID.released,
            rating: gameID.rating,
            genres: gameID.Genres.map((obj) => obj.name),

            createdDB: true
        }
        return game
    }
}

module.exports = { getAllVideogames, createVideogameDB, getVideogamesByName, getVideogameById }




