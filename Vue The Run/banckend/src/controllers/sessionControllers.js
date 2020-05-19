const connection = require('../database/connection')

module.exports = {
        async sessao(req,res){
          
            const {id} = req.body
          
               const pessoa = await connection('pessoas')
                                  .where('id', id)
                                  .select('name')
                                  .first()

                    
             if(!pessoa){
                 return res.status(400).json({msg: 'Pessoa nao cadastrada'})
             }
             return res.json(pessoa)                      
        } 
}