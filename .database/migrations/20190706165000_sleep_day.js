
exports.up=function(knex, Promise) {
    return knex.schema.createTable('sleep_day', tbl =>{
        tbl.increment();
        tbl.string('day', 255).notNullable();
    });
};

exports.down=function(knex, Promise){
    return knex.schema.dropTableIfExists('sleep_day');
};