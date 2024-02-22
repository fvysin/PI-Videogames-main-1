const { getAllVideogames, createVideogameDB, getVideogamesByName, getVideogameById } = require('../controllers/videogamesController')

const getVideogamesHandler = async (req, res) => {
    const { name } = req.query
    try {
        if(name){
            const response = await getVideogamesByName(name)
            res.status(200).json(response)
        } else {
            const response = await getAllVideogames()
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getVideogamesIdHandler = async (req, res) => {
    const { id } = req.params
    const source = isNaN(id) ? "dbb" : "api"
    try {
        const response = await getVideogameById(id, source)
            res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error: `No se encontraron resultados con el id: ${id}`})
    }
}

const postVideogamesHandler = async (req, res) => {
    const { name, description_raw, parent_platforms, background_image, released, rating, genres } = req.body
    try {
        const response = await createVideogameDB(name, description_raw, parent_platforms, background_image, released, rating, genres)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getVideogamesHandler,
    getVideogamesIdHandler,
    postVideogamesHandler
}