module.exports = function(app){

   app.get('/lista',(req,res) => {
       var connection = app.persistencia.connectionFactory();
       var relatorioDao = new app.persistencia.RelatorioDao(connection)
     //  console.log(connection)

       relatorioDao.lista3((err,result)=>{
           if(err){
               console.log(err)
           }else{
               console.log(result.rows)
               res.send(result.rows)
           }
       })
      
   })


   app.get('/lista2',(req,res) => {
    var connection = app.persistencia.connectionFactory();
    var relatorioDao = new app.persistencia.RelatorioDao(connection)
  //  console.log(connection)

    relatorioDao.lista2((err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result.rows)
            res.send(result.rows)
        }
    })
   
})


app.get('/lista3',(req,res)=> {
    var connection = app.persistencia.connectionFactory();
    var relatorioDao = new app.persistencia.RelatorioDao(connection)

    relatorioDao.gos((err,result)=>{
        if(err){
           console.log(err)
        }else{
          res.send(result.rows)
        }
    })
})


app.get('/lista4',(req,res)=>{
    var connection = app.persistencia.connectionFactory();
    var relatorioDao = new app.persistencia.RelatorioDao(connection)

    relatorioDao.calls((err,result)=>{
        if(err){
           console.log(err)
        }else{
          res.send(result.rows)
        }
    })
})

    

}