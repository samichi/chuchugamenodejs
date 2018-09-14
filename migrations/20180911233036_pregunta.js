
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pregunta', (table) => {
        table.increments();
        table.integer('id_capitulo');
        table.text('pregunta').notNullable();
        table.integer('respuesta').notNullable();
        table.text('audio_pregunta');
        table.text('img_opcion_1');
        table.text('img_opcion_2');
        table.text('img_opcion_3');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pregunta');
};
