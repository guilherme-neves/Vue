
var conectado = false
var respondidaDao

module.exports = function (app) {
    function conectar() {
        var connection = app.persistencia.connectionFactory();
        respondidaDao = new app.persistencia.RespondidaDao(connection)
    }

    app.get("/answeredCallsAlertTimes", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }

        respondidaDao.answeredCallsAlertTimes((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })


    app.get("/answeredCallsAlertTimesAllAgents", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        respondidaDao.answeredCallsAlertTimesAllAgents((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/answeredCallsLertTimesDetails", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        respondidaDao.answeredCallsLertTimesDetails((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/answeredCallsAlertTimesDetailsTotal", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        respondidaDao.answeredCallsAlertTimesDetailsTotal((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/answeredCallsPerHour", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        respondidaDao.answeredCallsPerHour((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/answeredCallsStatistics", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        respondidaDao.answeredCallsStatistics((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/answeredCallsWrapupInformation", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        respondidaDao.answeredCallsWrapupInformation((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/answeredCallsWrapupInformation2", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        respondidaDao.answeredCallsWrapupInformation2((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

    app.get("/answeredCallsWrapupInformation3", (req, res) => {
        if (!conectado) {
            conectar()
            conectado = true
        }
        respondidaDao.answeredCallsWrapupInformation3((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result.rows)
            }
        })

    })

}