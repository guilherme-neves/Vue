var conectado = false
var chamadaDao


module.exports = function (app) {
    function conectar() {
        var connection = app.persistencia.connectionFactory();
        chamadaDao = new app.persistencia.ChamadaDao(connection)
    }

    app.get("/callTrafficAllAgentsPerHours", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        chamadaDao.callTrafficAllAgentsPerHours((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })


    app.get("/callTrafficAllQueuesPerHourDaily", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }


        chamadaDao.callTrafficAllQueuesPerHourDaily((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })


    app.get("/callTrafficAllQueuesPerHourDaily2", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        chamadaDao.callTrafficAllQueuesPerHourDaily2((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })


    app.get("/callTrafficAllQueueTimeGosPerHourDaily", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        chamadaDao.callTrafficAllQueueTimeGosPerHourDaily((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })


    app.get("/callTrafficAllQueueTimeGosPerHourDaily2", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }


        chamadaDao.callTrafficAllQueueTimeGosPerHourDaily2((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })


    app.get("/callTrafficByQueuePerHour", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        chamadaDao.callTrafficByQueuePerHour((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })



    app.get("/callTrafficByQueuePerHourDaily", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }


        chamadaDao.callTrafficByQueuePerHourDaily((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })


    app.get("/callTrafficByQueuePerHourDailyDetails", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        chamadaDao.callTrafficByQueuePerHourDailyDetails((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })


    app.get("/callTrafficOneAgentPerHourDaily", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }


        chamadaDao.callTrafficOneAgentPerHourDaily((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })


    app.get("/callTrafficOneAgentPerHourDailyDetails", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }


        chamadaDao.callTrafficOneAgentPerHourDailyDetails((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })



    app.get("/callTraffiCOneQueueTimeGosPerHourDaily", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }


        chamadaDao.callTraffiCOneQueueTimeGosPerHourDaily((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })


    app.get("/callTraffiCOneQueueTimeGosPerHourDaily2", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

      chamadaDao.callTraffiCOneQueueTimeGosPerHourDaily2((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })





}