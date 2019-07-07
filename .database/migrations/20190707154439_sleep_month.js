
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sleep_month', table => {
      table.increments();
      table.string('month', 255)
           .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExist('sleep_month');
};
