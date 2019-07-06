exports.up = function(knex) {
    return knex.schema.createTable('sleep_stats', tbl => {
      tbl
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('cascade')
        .onUpdate('cascade');
   
      tbl.string('date', 128).notNullable().unique;    
      tbl.string('start_sleep', 128).notNullable();
      tbl.string('end_sleep', 128).notNullable();
      tbl
        .integer('waking_emotion')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_emotion')
        .onDelete('cascade')
        .onUpdate('cascade');
  
      tbl
        .integer('emotion')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sleep_emotions')
        .onDelete('cascade')
        .onUpdate('cascade');
  
      tbl
        .integer('month')
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
        .references('year')
        .inTable('years')
        .onDelete('cascade')
        .onUpdate('cascade');
  
      tbl
        .integer('day')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('days')
        .onDelete('cascade')
        .onUpdate('cascade');
  
      tbl.primary(['user_id', 'date']);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('sleep_stats');
  };