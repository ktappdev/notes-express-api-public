require('dotenv').config()
const cors = require("cors");
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');


// const corsOptions ={
//     origin:'*', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//  }

app.use(cors({
    origin: ["https://secretnote.netlify.app"],
    // origin: "*",
    methods: ["*"],
}));


mongoose.connect(process.env.DB_URL)
app.use(express.json())
//

const notesRouter = require('./routes/notesRouter')
app.use('/notes', notesRouter)

app.listen(port, () => {
    console.log('server started')
})





