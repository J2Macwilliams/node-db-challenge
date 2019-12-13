
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {resource_name: 'iMac', resource_description: 'to learn development.', project_id: 1},
        {resource_name: 'internet', resource_description: 'to reach the world.', project_id: 1},
        {resource_name: 'iMac', resource_description: 'For applying for jobs / networking.', project_id: 2},
        {resource_name: 'Business Attire', resource_description: 'Look the part.', project_id: 2},
        {resource_name: 'iMac', resource_description: 'Utilize tech to search for tiny house opportunities.', project_id: 3},
        {resource_name: '$$', resource_description: 'Savings for the future.', project_id: 3},
      ]);
    });
};
