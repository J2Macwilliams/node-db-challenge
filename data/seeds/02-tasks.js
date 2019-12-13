
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {description: 'Pass this Sprint', notes:'Gotta move quick, time is ticking', completed:'false', project_id: 1},
        {description: 'Pass Node Unit', notes:'', completed:'false', project_id: 1},
        {description: 'Create Full Stack Projects for resume', notes:'Need more/better projects', completed:'false', project_id: 2},
        {description: 'Network', notes:'Utilize all the resources I have.', completed:'false', project_id: 2},
        {description: 'Research Tiny Houses', notes:'Communicate with wife must haves for tiny house. ', completed:'false', project_id: 3},
        {description: 'Research plots and building needs for Tiny house', notes:'Analyze best tactics of making this happen', completed:'false', project_id: 3},
        
      ]);
    });
};
