
exports.up = function(knex) {
    return knex.schema.createTable('todos', function(table) {
        table.increments();
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('dueDate').notNullable();
        table.integer('priority').notNullable();
        table.integer('status').notNullable();

        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos');
};
