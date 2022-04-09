const express = require('express');
const dotenv = require("dotenv")
dotenv.config();
const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 3001;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//import routes
const taskRoutes = require('./modules/examples/routes/task');
const authRoutes = require('./modules/auth/routes/auth');
const imageRoutes = require('./modules/image/imageUploadRooute');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TestDb');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

taskRoutes(app);
authRoutes(app);
imageRoutes(app);

app.listen(port);


console.log('test RESTful API server started on: ' + port);