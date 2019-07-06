
exports.up = function(knex, Promise) {
    return knex.schema.createTable('day', tbl => {
        tbl.increments();
        tbl.string('day', 255).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('day');
};
