
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sleep_month', tbl=> {
        tbl.increments();
        tbl.string('month', 255).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('sleep_month');
};
