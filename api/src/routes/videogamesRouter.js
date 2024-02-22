const { getVideogamesHandler, getVideogamesIdHandler, postVideogamesHandler } = require('../handlers/videogamesHandler')

const { Router } = require('express')

const videogamesRouter = Router()

videogamesRouter.get('/', getVideogamesHandler)

videogamesRouter.get('/:id', getVideogamesIdHandler)

videogamesRouter.get('/name/:name', getVideogamesHandler)

videogamesRouter.post('/', postVideogamesHandler)

module.exports = videogamesRouter