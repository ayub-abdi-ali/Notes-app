const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const NRoutes = require('./routes/notes');
const RRoutes = require('./routes/user');
const LRoutes = require('./routes/user');




const app = express();
const PORT = 3000;

//connection to mongoDB
connectDB();

//middleware
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/notes', NRoutes);
app.use('/register', RRoutes);
app.use('/login', LRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT} `);
})