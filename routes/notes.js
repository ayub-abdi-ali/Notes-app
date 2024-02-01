const express = require('express');
const NRouter = express.Router();
const Note = require('../models/Notes');

//get all the notes
NRouter.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch {
        res.status(500).json({ message: err.message });
    }
})

//get a single note by ID 
NRouter.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


//create a note in the db
NRouter.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

//update a note by ID
NRouter.put('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });

        if (req.body.title)
            note.title = req.body.title;
        if (req.body.content)
            note.content = req.body.content;
        const updateNote = await note.save();
        res.json(updateNote);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


NRouter.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });
        await note.deleteOne();
        res.json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})




module.exports = NRouter;