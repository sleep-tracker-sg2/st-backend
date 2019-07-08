
exports.up = function(knex) {
  return knex.schema.createTable('sleep_day', table => {
      table
        .increments();
      table
        .string('day', 255)
        .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sleep_day');
};
