
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sleep_year', tbl =>{
        tbl
        .integer('year')
        .notNullable()
        .unique()
        .unsigned();

        tbl.string('year', 255).notNullable();
        tbl.primary(['year']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('sleep_year');
};
