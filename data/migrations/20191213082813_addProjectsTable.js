exports.up = function(knex) {
	return knex.schema
		.createTable('projects', tbl => {
			tbl.increments();
			tbl.string('name', 128).notNullable();
			tbl.string('description', 255);
			tbl.boolean('completed').notNullable();
		})
		.createTable('task', tbl => {
			tbl.increments();
			tbl.string('description', 512).notNullable();
			tbl.string('notes', 512);
			tbl.boolean('completed').notNullable();
			tbl
				.integer('project_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('projects')
				.onDelete('CASCADE') // CASCADE, RESTRICT, DO NOTHING, SET NULL,
				.onUpdate('CASCADE');
		});
};

exports.down = function(knex) {};
