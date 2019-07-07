
exports.up = function(knex) {
    return knex.schema.createTable('sleep_actions', tbl => {
      
      tbl
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('cascade')
        .onUpdate('cascade');
      tbl
        .integer('sleep_month')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('months')
        .onDelete('cascade')
        .onUpdate('cascade');
      tbl
        .integer('year')
        .notNullable()
        .unsigned()
        .references('sleepYear')
        .inTable('sleep_year')
        .onDelete('cascade')
        .onUpdate('cascade');
      tbl
      .string('sleep_actions', 255)
      .notNullable();
      tbl
      .primary(['user_id', 'month', 'year']);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('sleep_actions');
  };