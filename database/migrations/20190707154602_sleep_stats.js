
exports.up = function(knex) {
  return knex.schema.createTable('sleep_stats', table => {
    table
        .increments()
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
    table
        .string('start_sleep',128)
        .notNullable();
    table
        .string('end_sleep')
        .notNullable();
    table
        .integer('emotions')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_emotions')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    // table
    //     .integer('sleep_emotion')
    //     .notNullable()
    //     .unsigned()
    //     .references('id')
    //     .inTable('sleep_emotions')
    //     .onDelete('CASCADE')
    //     .onUpdate('CASCADE');
    table
        .integer('m')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_month')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table
        .integer('y')  
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_year')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table
        .integer('d')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_day')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    // table
        // .primary(['user_id', 'date']);    
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sleep_stats');
};
