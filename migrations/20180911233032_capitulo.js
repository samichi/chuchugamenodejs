
exports.up = function(knex, Promise) {
    return knex.schema.createTable('capitulo', (table) => {
        table.increments();
        table.text('titulo');
        table.text('video_youtube');
        table.text('portada');
        table.integer('id_excursion');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('capitulo');
};
