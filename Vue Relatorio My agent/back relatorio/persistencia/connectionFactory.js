var pg = require('pg')

const config = {
    host: '192.168.25.200',
    user: 'postgres',
    password: 'HOOME0706',
    database: 'vsl',
    port: 5432,

};



function createDBConnection() {
    var conexao = new pg.Client(config)
    conexao.connect(err => {
        if (err) {
            console.log(err)
        }
    })


    return conexao
}

/*
function createDBConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'fdp'
    })
}*/

module.exports = function () {
    return createDBConnection
}

