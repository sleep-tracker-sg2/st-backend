
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sleep_year', table => {
        table
            .integer('year')
            .notNullable()
            .unique()
            .unsigned();
        table
            .string('sleepYear', 255)
            .notNullable();    
        table
            .primary(['year']);    
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sleep_year');
};
