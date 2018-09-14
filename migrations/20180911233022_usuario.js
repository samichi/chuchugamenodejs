
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuario', (table) => {
        table.increments();
        table.text('nombre');
        table.text('usuario');
        table.text('clave');
        table.text('rol');
        table.text('foto');
        table.integer('puntos').notNullable().defaultTo(0);
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuario');
};
