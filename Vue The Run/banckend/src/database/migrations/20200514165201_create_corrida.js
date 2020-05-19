
exports.up = function(knex) {
    return knex.schema.createTable('corridas', function(table){
        table.increments();
        table.string('local').notNullable();
        table.string('descricao').notNullable();
        table.date('data').notNullable();
        table.string('tempo').notNullable();
        table.string('pessoa_id').notNullable()
        table.foreign('pessoa_id').references('id').inTable('pessoas')
    })
};

exports.down = function(knex) {
   return knex.schema.dropTable('corridas')
};
