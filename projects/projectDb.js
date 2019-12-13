const db = require('../data/dbConfig.js');
module.exports = {
get,
getById,
add,
update,
remove,
};

function get() {
return db('project');
}

function getById(id) {
return db('project')
.where({ id })
.first();
}

function add(post) {
return db('project')
.insert(post)
.then(ids => {
return getById(ids[0]);
});
}

function update(id, changes) {
return db('project')
.where({ id })
.update(changes);
}

function remove(id) {
return db('project')
.where('id', id)
.del();
}