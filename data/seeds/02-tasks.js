
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {task_description: 'Pass this Sprint', task_notes:'Gotta move quick, time is ticking', completed:'false', project_id: 1},
        {task_description: 'Pass Node Unit', task_notes:'', completed:'false', project_id: 1},
        {task_description: 'Create Full Stack Projects for resume', task_notes:'Need more/better projects', completed:'false', project_id: 2},
        {task_description: 'Network', task_notes:'Utilize all the resources I have.', completed:'false', project_id: 2},
        {task_description: 'Research Tiny Houses', task_notes:'Communicate with wife must haves for tiny house. ', completed:'false', project_id: 3},
        {task_description: 'Research plots and building needs for Tiny house', task_notes:'Analyze best tactics of making this happen', completed:'false', project_id: 3},
      ]);
    });
};
