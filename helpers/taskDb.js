const db = require('../data/dbConfig.js');
module.exports = {
get,
getById,
add,
update,
remove,
};

function get() {
return db('tasks');
}

function getById(id) {
return db('tasks')
.where({ id })
.first();
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