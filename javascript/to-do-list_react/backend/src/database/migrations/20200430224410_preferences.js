
exports.up = function(knex) {
    return knex.schema.createTable('preferences', function(table) {
        table.string('user_id').primary().notNullable();
        table.string('theme');
        table.integer('parameter');

        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schame.dropTable('preferences');
};
