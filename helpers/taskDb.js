const db = require('../data/dbConfig.js');
module.exports = {
get,
getById,
add,
update,
remove,
};

function get() {
return db('tasks as t')
.select('t.id', 't.project_id' , 'p.project_name' , 'p.project_description' , 't.task_description', 't.task_notes', 't.completed')
.join('projects as p', 't.project_id', 'p.id');
}

//select t.id , t.project_id , p.name , p.description , t.description , t.notes , t.completed from tasks as t join projects as p on t.project_id = p.id

function getById(id) {
return db('tasks as t')
.select('t.id', 't.project_id' , 'p.project_name' , 'p.project_description' , 't.task_description', 't.task_notes', 't.completed')
.join('projects as p', 't.project_id', 'p.id')
.where({ id });
}

function add(post) {
return db('tasks')
.insert(post)
.then(ids => {
return getById(ids[0]);
});
}

function update(id, changes) {
return db('tasks')
.where({ id })
.update(changes);
}

function remove(id) {
return db('tasks')
.where('id', id)
.del();
}