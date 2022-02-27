var mysql = require('mysql');
var migration = require('mysql-migrations');
var config = require('./config.js');

var connection = mysql.createPool(config.db);

migration.init(connection, __dirname + '/migrations', function() {
    console.log('Finished Running migrations, Happy coding!');
});