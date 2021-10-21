const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { restart } = require('nodemon');
const apiRoutes = require('./routes/apiRoutes');
const db = require('./db/connection')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).end();
})

db.connect(err => {
    if(err) throw err;
    console.log("database connected.");
    app.listen(PORT, () => {
        console.log(`Sever running on port ${PORT}`);
    });
});