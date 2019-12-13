const express = require('express');

const router = express.Router();

router.use(express.json())

const taskDb = require('../helpers/taskDb');
// CRUD endpoints -------------------------------

// Global GET endpoint
router.get('/', (req, res) => {

    taskDb.get()
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error getting the tasks." })
        })
});

// GET endpoint by Id
router.get('/:id', validateId, (req, res) => {
    const id = req.params.id
    
    taskDb.getById(id)
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error getting the tasks." })
        })
});


// POST endpoint for new tasks with validation of necessary information
router.post('/', validatePost, (req, res) => {
    const projBody = req.body

    taskDb.add(projBody)
        .then(createProj => {
            res.status(200).json(createProj)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error creating that task." })
        })
});

// DELETE by tasks ID
router.delete('/:id', validateId, (req, res) => {
    const id = req.params.id

    taskDb.getById(id)
        .then(deletedTask => {
            taskDb.remove(id, deletedTask)
                .then(gone => {
                    res.status(200).json({ message: `The task with id: ${id} was deleted`, deletedTask })
                })
                .catch(() => {
                    res.status(500).json({ message: "There was an error deleting the task" })
                })
        })
        .catch(() => {
            res.status(500).json({ message: "Deleting the task...Not Happening!" })
        })

});


// PUT by ID to Update tasks
router.put('/:id', validateId, validatePost, (req, res) => {
    const id = req.params.id
    const changes = req.body

    taskDb.get(id)
        .then(found => {
            taskDb.update(id, changes)
                .then(update => {
                    res.status(200).json({ message: "Updated with", description: `${changes.task_description}` , taskNotes: `${changes.task_notes}` , completed: `${changes.completed}`})
                })
                .catch((error) => {
                    res.status(500).json({ message: "The Update had problems", error })
                })
        })
        .catch((error) => {
            res.status(404).json({ message: "Invalid Id", error })
        })

});

// custom middleware-----------------------------


// Validation of ID with custom middleware 
function validateId(req, res, next) {
    const id = req.params.id
    taskDb.get(id)
        .then(id => {
            req.project = id
        })
        .catch(() => {
            res.status(400).json({ message: "invalid user id" })
        })
    next();
}

// Validation custom middleware that POST has necessary information
function validatePost(req, res, next) {
    const projInfo = req.body

    if (!projInfo) {
        res.status(400).json({ message: "Missing project data." })
    } else {
        next();
    }
}

module.exports = router;