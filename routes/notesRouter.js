const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const blobOps = require('../modules/blobOps.js')


router.get('/', async (req, res) => {
    res.status(200).send({message: "Api is live, use the app to communicate"})
})

router.post('/:phrase', async (req, res) => {
    console.log(req.files.file.name, req.files.file.data) //
    blobOps.upload(req.files.file.data, req.files.file.name)
        .then(() => console.log('done'))
        .catch((ex) => console.log(ex.message));
})

router.get('/titleimage/:phrase',  async (req, res) => {
    console.log("searching for image " + req.params.phrase)
    const URL = await blobOps.getABlob(req.params.phrase)
    res.status(200).send({url: URL})
})

router.get('/:phrase', createOrGetNoteByPhrase, async (req, res) => {
    res.status(200).send(res.note)
})

router.patch('/:phrase', updateNoteByPhrase, async (req, res) => {
    res.status(201).send(res.note)
})


async function createOrGetNoteByPhrase(req, res, next) {
    if (req.params.phrase.length < 32) {
        return res.status(500).json({ message: "something went wrong (title not encrypted)"})
    }
    const newPost = new Note({
        phrase: req.params.phrase,
        msg: req.body.msg,
        created: Date.now()
    })
    try {
        const noteId = await Note.exists({ phrase: req.params.phrase })
        if (noteId === null) {
            newPost.msg = ""
            const data = await Note.findOneAndUpdate(
                {phrase: newPost.phrase},
                newPost,
                { upsert: true, returnDocument: 'after' }
            )
            return res.status(201).json(data)
        }
    }catch (e){
        return res.status(500).json({ message: "something went wrong in createOrGetNoteByPhrase function"})
    }
    data = await Note.find({ phrase: req.params.phrase });
    res.note = data[0];
    next()
}


async function updateNoteByPhrase(req, res, next) {
    if (req.params.phrase.length < 32) {
        return res.status(500).json({ message: "something went wrong (title not encrypted)"})
    }
    const newPost = new Note({
        phrase: req.params.phrase,
        msg: req.body.msg,
        date: Date.now()
    })
    try {
        res.note = await Note.findOneAndUpdate({phrase: req.params.phrase},
            {msg: newPost.msg,
                date: newPost.date},
            {upsert: true, returnDocument: 'after'})
        next()
    }catch (e){
        return res.status(500).json({ message: "something went wrong in updateNoteByPhrase function"})
    }
}


module.exports = router