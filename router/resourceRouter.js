const express = require('express');

const router = express.Router();

router.use(express.json())

const resourceDb = require('../helpers/resourceDb');
// CRUD endpoints -------------------------------

// Global GET endpoint
router.get('/', (req, res) => {

    resourceDb.get()
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error getting the resource." })
        })
});

// GET endpoint by Id
router.get('/:id', validateId, (req, res) => {
    const id = req.params.id
    resourceDb.get(id)
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error getting the resource." })
        })
});


// POST endpoint for new resource with validation of necessary information
router.post('/', validatePost, (req, res) => {
    const projBody = req.body

    resourceDb.add(projBody)
        .then(createProj => {
            res.status(200).json(createProj)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error creating that project." })
        })
});

// DELETE by resource ID
router.delete('/:id', validateId, (req, res) => {
    const id = req.params.id

    resourceDb.get(id)
        .then(deletedProj => {
            resourceDb.remove(id, deletedProj)
                .then(gone => {
                    res.status(200).json({ message: `The resource with id: ${id} was deleted`, deletedProj })
                })
                .catch(() => {
                    res.status(500).json({ message: "There was an error deleting the resource" })
                })
        })
        .catch(() => {
            res.status(500).json({ message: "Deleting the resource...Not Happening!" })
        })

});


// PUT by ID to Update resource
router.put('/:id', validateId, validatePost, (req, res) => {
    const id = req.params.id
    const createProj = req.body

    resourceDb.get(id)
        .then(found => {
            resourceDb.update(id, createProj)
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
    resourceDb.get(id)
        .then(id => {
            req.project = id
        })
        .catch(() => {
            res.status(400).json({ message: "invalid resource id" })
        })
    next();
}

// Validation custom middleware that POST has necessary information
function validatePost(req, res, next) {
    const projInfo = req.body

    if (!projInfo) {
        res.status(400).json({ message: "Missing resource data." })
    } else {
        next();
    }
}


module.exports = router;
