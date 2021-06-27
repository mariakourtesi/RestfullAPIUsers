let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let database = require('./database/db');
const createError = require('http-errors');


const userRoute = require('../server/routes/user.routes')


mongoose.Promise = global.Promise;
mongoose.connect(database.db,  {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Database connected sucessfully !')
},
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/users', userRoute)


// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});


app.listen(process.env.PORT || 4000, () =>{
    console.log('Server is up and running 🚀');
});