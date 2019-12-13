const db = require('../data/dbConfig.js');
module.exports = {
get,
getById,
add,
update,
remove,
};

function get() {
return db('project_details');
}

function getById(id) {
return db('project_details')
.where({ id })
.first();
}

function add(post) {
return db('project_details')
.insert(post)
.then(ids => {
return getById(ids[0]);
});
}

function update(id, changes) {
return db('project_details')
.where({ id })
.update(changes);
}

function remove(id) {
return db('project_details')
.where('id', id)
.del();
}