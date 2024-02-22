const axios = require('axios')


const { Videogame, Genre } = require('../db')

//https://api.rawg.io/api/games?key=80be86f9ad474b6ca09f2bea0a2ff3e2

const URL = 'https://api.rawg.io/api/games'
const { API_KEY } = process.env

const getVideogamesAPI = async () => {
    const allGames = []
    let page = 1
    while (page <= 5) {
        let apiData = await axios.get(`${URL}?key=${API_KEY}&page=${page}`)

        apiData.data.results.map((game) => {
            allGames.push({
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                rating: game.rating,
                parent_platforms: game.parent_platforms.map(item => item.platform.name).join(', '),
                genres: game.genres.map((genre) => genre.name).join(', '),
                createdDB: false
            })
        })
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
        genres: game.Genres.map((gen) => gen.name).join(', ')
    }))
    return result
}

const getAllVideogames = async () => {
    const gamesAPI = await getVideogamesAPI()
    const gamesDB = await getVideogamesDB()
    const allVideogames = [...gamesDB, ...gamesAPI]
    return allVideogames
}

const createVideogameDB = async (name, description_raw, parent_platforms, background_image, released, rating, genres) => {
    const gameDB = await Videogame.findAll({ where:{ name: name}})
    if(gameDB.length != 0){
        throw new Error(`${name} ya existe en la Base de Datos`)
    }
    
    const newGame = await Videogame.create({name, description_raw, parent_platforms, background_image, released, rating})

    const genresDB = await Genre.findAll({
        where: {name: genres}
    })
    newGame.addGenre(genresDB)
    return newGame
} 

const getVideogamesByName = async (name) => {
    const allVideogames = await getAllVideogames()
    const gameFiltered = allVideogames.filter((game) => game.name.toLowerCase().includes(name.toLowerCase()))
    if(!gameFiltered.length) throw Error(`No se encontraron resultados con el nombre: ${name}`)
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
            genres: respID.data.genres.map((genre) => genre.name).join(', '),
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
            genres: result.join(', '),
            createdDB: true
        }
        return game
    }
}

module.exports = { getAllVideogames, createVideogameDB, getVideogamesByName, getVideogameById }


// {
//     "name": "Minecraft",
//     "description_raw": "Juego de construcción, supervivencia y aventura con la dinamica de que todo el esta basado en cubos",
//     "parent_platforms": ["PC", "PlayStation", "Xbox"],
//     "background_image": "https://www.minecraft.net/content/dam/games/minecraft/key-art/SUPM_Game-Image_One-Vanilla_672x400.jpg",
//     "released": "2011-11-18",
//     "rating": 5,
//     "genres": ["Action", "Adventure", "RPG"]
//   }




// {
//     "name": "FIFA 14",
//     "description_raw": "Juego de futbol hambientado en la temporada 2013/2014",
//     "parent_platforms": ["PlayStation", "Xbox"],
//     "background_image": "https://i.blogs.es/527fd2/fifa-14-generacion-xbox-190717/1366_2000.jpg",
//     "released": "2013-04-17",
//     "rating": 5,
//     "genres": ["Sports", "Strategy"]
//   }




// [
//     {
//       "id": 3498,
//       "name": "Grand Theft Auto V",
//       "background_image": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
//       "parent_platforms": [
//         "PC",
//         "PlayStation",
//         "Xbox"
//       ],
//       "genres": [
//         "Action",
//         "Adventure"
//       ],
//       "createdDB": false
//     },
//     {
//       "id": 3328,
//       "name": "The Witcher 3: Wild Hunt",
//       "background_image": "ht