const getGenresHandler = require('../handlers/genresHandler')

const { Router } = require('express')

const genresRouter = Router()

genresRouter.get('/', getGenresHandler)

module.exports = genresRouter 