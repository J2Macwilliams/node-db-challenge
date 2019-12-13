
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'Go to Lambda School', description: 'Attend and Complete Lambda SChool with knowledge of Web Development.', completed: 'false'},
        {name: 'Get a Job', description: 'Get Hired by a tech company that provides a healthy income, great work/life balance.', completed: 'false'},
        {name: 'Build a Tiny House', description: 'Research and Build a Tiny House to live in with wife an cut expenses.', completed: 'false'}
      ]);
    });
};
