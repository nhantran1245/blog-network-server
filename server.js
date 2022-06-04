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
const authRoutes = require('./modules/auth/routes');
const imageRoutes = require('./modules/image/imageUploadRoute');
const userRoutes = require('./modules/user/routes');
const blogRoutes = require('./modules/blog/routes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TestDb');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

authRoutes(app);
imageRoutes(app);
userRoutes(app);
blogRoutes(app);

app.listen(port);


console.log('test RESTful API server started on: ' + port);