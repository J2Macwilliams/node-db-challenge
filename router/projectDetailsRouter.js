const express = require('express');

const router = express.Router();

router.use(express.json());

const prjDetDb = require('../helpers/projectDetailsDb');
// CRUD endpoints -------------------------------

// Global GET endpoint
router.get('/', (req, res) => {

    prjDetDb.get()
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error getting the projects." })
        })
});

// GET endpoint by Id
router.get('/:id', validateId, (req, res) => {
    const id = req.params.id
    prjDetDb.get(id)
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error getting the projects." })
        })
});


// POST endpoint for new projects with validation of necessary information
router.post('/', validatePost, (req, res) => {
    const projBody = req.body

    prjDetDb.insert(projBody)
        .then(createProj => {
            res.status(200).json(createProj)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error creating that project." })
        })
});

// DELETE by projects ID
router.delete('/:id', validateId, (req, res) => {
    const id = req.params.id

    prjDetDb.get(id)
        .then(deletedProj => {
            prjDetDb.remove(id, deletedProj)
                .then(gone => {
                    res.status(200).json({ message: `The project with id: ${id} was deleted`, deletedProj })
                })
                .catch(() => {
                    res.status(500).json({ message: "There was an error deleting the project" })
                })
        })
        .catch(() => {
            res.status(500).json({ message: "Deleting the project...Not Happening!" })
        })

});


// PUT by ID to Update projects
router.put('/:id', validateId, validatePost, (req, res) => {
    const id = req.params.id
    const createProj = req.body

    prjDetDb.get(id)
        .then(found => {
            prjDetDb.update(id, createProj)
                .then(update => {
                    res.status(200).json({ message: "Updated with", name: `${createProj}` })
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
    prjDetDb.get(id)
        .then(id => {
            req.project = id
        })
        .catch(() => {
            res.status(400).json({ message: "invalid project id" })
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