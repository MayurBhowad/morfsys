const express = require('express');
const mongoose = require('mongoose');

requier('dotenv').congif();
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_STRING, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))

app.use('/operations', require('./routes/operations.routes'));
app.use('/users', require('./routes/user.routes'));

app.listen(PORT, () => console.log('server is up...'))
