
exports.up = function(knex) {
  return knex.schema.createTable('sleep_actions', table => {
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('month')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_month')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .string('year',255) 
        .notNullable()
        .unsigned()
        .references('year')
        .inTable('sleep_year')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .string('sleepAction',255)
        .notNullable();
     table
        .primary(['user_id', 'month', 'year']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sleep_actions');
};
