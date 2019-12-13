
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('project_details').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('project_details').insert([
        {name:'Go to Lambda School', project_id: 1, resource_id: 1},
        {name:'Go to Lambda School', project_id: 1, resource_id: 2},
        {name:'Get a Job', project_id: 2, resource_id: 3},
        {name:'Get a Job', project_id: 2, resource_id: 4},
        {name:'Build a Tiny House', project_id: 3, resource_id: 5},
        {name:'Build a Tiny House', project_id: 3, resource_id: 6},
      ]);
    });
};
