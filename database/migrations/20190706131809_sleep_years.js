
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sleep_years', tbl => {
        tbl.increments();
        tbl.string('year', 255).notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sleep_years');
};
