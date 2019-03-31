var conectado = false
var agenteDao
var moment = require('moment')

module.exports = function (app) {
    const Hora = require('../util/TransformarHora')

    function conectar() {
        var connection = app.persistencia.connectionFactory();
        agenteDao = new app.persistencia.AgenteDao(connection)
    }

    app.get('/agentLogin', (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentLogin((err, result) => {
            if (err) {
                console.log(err)
            } else {

                var _agent = result.rows.map((agent) => {
                    return {
                        'Start Date': moment(agent['Start Date']).format('L'),
                        'Start Time': agent['Start Time'],
                        'End time': agent['End time'],
                        'timeinsec': Hora.transformaHora(agent['timeinsec'])
                    }
                })
                res.send(_agent)
            }
        })

    })


    app.get('/agentMissedCall', (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentMissedCall((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })

    app.get('/agentBreakTime', (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentTempoPausa((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })


    app.get('/agentStatusAll', (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentStatusAll((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })

    app.get('/agentStatus', (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentStatusByUsuario((err, result) => {
            if (err) {
                console.log(err.message)
            } else {
                res.send(result.rows)
            }
        })
    })

    app.get('/agentStatus2', (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentStatusByUsuario2((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })

    app.get("/agentWorkTimes", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        agenteDao.agentWorkTime((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })
    })

    app.get("/agentcallporcentage", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentCallPercentage((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })


    app.get("/agentCallQueueSpecific", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        agenteDao.agentCallQueueSpecific((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/agentGos", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentGos((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/agentGosDaily", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        agenteDao.agentGosDaily((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })


    app.get("/agentPerformanceDetails", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentPerformanceDetails((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/agentPrivateCall", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentPrivateCall((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })


    app.get("/agentPrivateCallPerAgent", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        agenteDao.agentPrivateCallPerAgent((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })


    app.get("/agentPropertiesQueue", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentPropertiesQueue((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })


    app.get("/agentAllUserCallsByAgent", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        agenteDao.agentAllUserCallsByAgent((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/agentAllUserCalls", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentAllUserCalls2((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/agentAllUserCalls2", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        agenteDao.agentAllUserCalls2((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })


}