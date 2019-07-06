
exports.up = function(knex,Promise) {
  return knex.schema.createTable('sleep_emotion', tbl=>{
      tbl.increments();
      tbl.string('emotion', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sleep_emotion');
};
