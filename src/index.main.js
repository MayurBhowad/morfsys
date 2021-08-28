const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('passport')

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_STRING, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err))

app.use(passport.initialize());
require('./config/passport.config')(passport)

app.use('/invoice', require('./routes/invoice.routes'));
app.use('/users', require('./routes/user.routes'));

// if (process.env.NODE_ENV === 'production') {
// app.use(express.static('frontend'));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
// });
// }

app.listen(PORT, () => console.log('server is up...'))
