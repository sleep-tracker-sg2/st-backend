
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', table => {
        table
            .increments();
        table
            .string('first_name', 128)
            .notNullable();
        table
            .string('last_name', 128)
            .notNullable();
        table
            .string('username', 128)
            .notNullable()
            .unique();            
        table
            .string('password',128)
            .notNullable();
        table
            .string('email',128)
            .notNullable();        
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
