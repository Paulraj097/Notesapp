//imports:::::::

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

// application setup:::::::

const app =express();
const port = process.env.PORT || 5000;

// Middleware:::::::::

app.use(cors());
app.use(express.json());


//MongoDb Connection

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("MongoDb Connected"))
.catch(err => console.log(err));

// Routes 

const notesRouter = require('../routes/notes');
app.use('/api/notes',notesRouter);

app.listen(port,()=>{
    console.log(`Server runing on port ${port}`);

});
