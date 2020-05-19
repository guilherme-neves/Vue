const connection = require('../database/connection')

module.exports = {
    async listar(req, res) {
        pessoa_id = req.headers.authorization 
        const list = await connection('corridas')
                        .where('pessoa_id',pessoa_id)    
                        .select('*')
        res.json(list)
    },
    async salvar(req, res) {
        const corrida = req.body
        corrida.pessoa_id = req.headers.authorization
        try {
            await connection('corridas').insert(corrida)
            res.status(201).send("Salvo")
        } catch (err) {
            res.status(401).json(err)
        }
    },
    async remover(req, res) {
        const { id } = req.params
        const pessoa_id = req.headers.authorization
        console.log(id)
        const pessoa = await connection('corridas')
            .where('id', id)
            .select('*')
            .first()

        if (pessoa.pessoa_id != pessoa_id) {
            return res.status(401).json({ error: "Operação nao permitida" })
        }

        try {
            await connection('corridas').where('id', id).delete()
            res.status(204).send()
        } catch (err) {
            res.status(401).send()
        }



    }
}