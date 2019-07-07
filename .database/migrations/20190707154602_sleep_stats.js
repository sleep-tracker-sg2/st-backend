
exports.up = function(knex) {
  return knex.schema.createTable('sleep_stats', table => {
    table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table
        .string('date',128)
        .notNullable()
        .unique();    
    table
        .string('start_sleep',128)
        .notNullable();
    table
        .string('end_sleep')
        .notNullable();
    table
        .integer('waking_emotion')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_emotions')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table
        .integer('sleep_emotion')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_emotions')
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
        .integer('year')  
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_day')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table
        .integer('day')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_day')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table
        .primary(['user_id', 'date']);    
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sleep_stats');
};
