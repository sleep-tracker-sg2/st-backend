
exports.up = function (knex, Promise) {
    return knex.schema.createTable('sleep_emotions', table => {
        table.increments();
        table.string('waking_emotion', 255)
            .notNullable();
        table.string('sleep_emotion', 255)
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('sleep_emotions');
};
