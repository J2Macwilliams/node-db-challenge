const db = require('../data/dbConfig.js');
module.exports = {
get,
getById,
add,
update,
remove,
};

function get() {
return db('projects');
}

function getById(id) {
return db('projects')
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