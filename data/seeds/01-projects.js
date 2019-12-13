
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {project_name: 'Go to Lambda School', project_description: 'Attend and Complete Lambda SChool with knowledge of Web Development.', completed: 'false'},
        {project_name: 'Get a Job', project_description: 'Get Hired by a tech company that provides a healthy income, great work/life balance.', completed: 'false'},
        {project_name: 'Build a Tiny House', project_description: 'Research and Build a Tiny House to live in with wife an cut expenses.', completed: 'false'}
      ]);
    });
};
