// Update with your config settings.

module.exports = {
    client: 'mysql',
    connection: {
        host: '192.168.25.222',
        database: 'dbacesso',
        user: 'acesso',
        password: 'Projeto@21'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};