
exports.up=function(knex, Promise){
    return knex.schema.createTable('user', user => {
        user.increments();
        user
            .string('first_name', 128)
            .notNullable()
        user
            .string('last_name',128)
            .notNullable()
        user
            .string('username', 128)
            .notNullable()
            .unique();
        user
            .string('password', 128)
            .notNullable()
        user
            .string('email', 128)
            .notNullable();        

    });
};

exports.down=function(knex, Promise) {
    return knex.schema.dropTableIfExists('user');
};
