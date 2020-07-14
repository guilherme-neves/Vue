exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table) {
        table.timestamp('deleteAt')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users')
};