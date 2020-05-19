const crypto = require('crypto')
const connection = require('../database/connection')

module.exports ={
  async  lista(req,res){
        const list = await connection('pessoas').select('*')
        res.json(list)
    },
  async salvar(req,res){
        const pessoa = req.body
        pessoa.id = crypto.randomBytes(4).toString('HEX')
        const x = await connection('pessoas').insert(pessoa)
         res.json(pessoa.id)

    }
    
}