
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {name: 'iMac', description: 'to learn development.', project_id: 1},
        {name: 'internet', description: 'to reach the world.', project_id: 1},
        {name: 'iMac', description: 'For applying for jobs / networking.', project_id: 2},
        {name: 'Business Attire', description: 'Look the part.', project_id: 2},
        {name: 'iMac', description: 'Utilize tech to search for tiny house opportunities.', project_id: 3},
        {name: '$$', description: 'Savings for the future.', project_id: 3},
      ]);
    });
};
