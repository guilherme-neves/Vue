const express = require('express')
const routes = express.Router()
const PessoasControllers = require('./controllers/pessoasControllers')
const CorridaControllers = require('./controllers/corridaControllers')
const SessaoControllers = require('./controllers/sessionControllers')


routes.post('/login',SessaoControllers.sessao)

routes.get('/pessoas',PessoasControllers.lista)
routes.post('/pessoas', PessoasControllers.salvar)

routes.get('/corridas', CorridaControllers.listar)
routes.post('/corridas', CorridaControllers.salvar)
routes.delete('/corridas/:id', CorridaControllers.remover)

module.exports = routes

