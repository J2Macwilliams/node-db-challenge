const db = require('../data/dbConfig.js');
module.exports = {
	get,
	getById,
	add,
	update,
	remove
};

function get() {
	return db('projects');
}

// function getById(project_id) {
// 	return db('projects as p')
// 		.select(
// 			'p.id',
// 			'p.project_name',
// 			'p.project_description',
// 			'p.completed',
// 			't.id',
// 			't.task_description',
// 			't.task_notes',
// 			't.completed',
//             'r.id',
//             'r.resource_name',
//             'r.resource_description'
//         )
//         .join('tasks as t', 'p.id', 't.project_id')
//         .join('resources as r', 'p.id', 'r.project_id')
// 		.where({ project_id });
// }

function getById(id) {
	return db('tasks')
		.where({ id })
		.first();
}

function add(post) {
	return db('projects')
		.insert(post)
		.then(ids => {
			return getById(ids[0]);
		});
}

function update(id, changes) {
	return db('projects')
		.where({ id })
		.update(changes);
}

function remove(id) {
	return db('projects')
		.where('id', id)
		.del();
}
