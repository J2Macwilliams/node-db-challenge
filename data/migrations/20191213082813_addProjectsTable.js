exports.up = function(knex) {
	return knex.schema
		.createTable('projects', tbl => {
			tbl.increments();
			tbl.string('project_name', 128).notNullable();
			tbl.string('project_description', 255);
			tbl.boolean('completed').default().notNullable();
		})
		.createTable('tasks', tbl => {
			tbl.increments();
			tbl.string('task_description', 512).notNullable();
			tbl.string('task_notes', 512);
			tbl.boolean('completed').default().notNullable();
			tbl
				.integer('project_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('projects')
				.onDelete('CASCADE') // CASCADE, RESTRICT, DO NOTHING, SET NULL,
				.onUpdate('CASCADE');
		})
		.createTable('resources', tbl => {
			tbl.increments();
			tbl.string('resource_name', 512).notNullable();
			tbl.string('resource_description', 512);
			tbl
				.integer('project_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('projects')
				.onDelete('CASCADE') // CASCADE, RESTRICT, DO NOTHING, SET NULL,
				.onUpdate('CASCADE');
		})
		.createTable('project_details', tbl => {
			tbl.increments();
			tbl.string('project_details_name', 512).notNullable();
			tbl
				.integer('project_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('projects')
				.onDelete('CASCADE') // CASCADE, RESTRICT, DO NOTHING, SET NULL,
				.onUpdate('CASCADE');
			tbl
				.integer('resource_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('resources')
				.onDelete('CASCADE') // CASCADE, RESTRICT, DO NOTHING, SET NULL,
				.onUpdate('CASCADE');
		});
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('project_details');
    knex.schema.dropTableIfExists('resources');
    knex.schema.dropTableIfExists('tasks');
    knex.schema.dropTableIfExists('projects');
};
