const knex = require('knex')
const configurar = require('../../knexfile')

const connection = knex(configurar.development)

module.exports = connection
