var conectado = false

module.exports = function (app) {
    function conectar() {
        var connection = app.persistencia.connectionFactory();
        abandonoDao = new app.persistencia.AbandonoDao(connection)
    }

    app.get('/abandono', (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        abandonoDao.abandonoChamadaPorHora((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get('/abandonoEstatistica', (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }


        abandonoDao.abandonoChamadaEstatistica((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })


    app.get('/abandonoEstatisticaDetalhada', (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }


        abandonoDao.abandonoChamadaEstatisticaDetalhada((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

}