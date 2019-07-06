
exports.up = function(knex,Promise) {
  return knex.schema.createTable('emotion', tbl=>{
      tbl.increments();
      tbl.string('emotion', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('emotion');
};
