module.exports = {
    "up": function(conn, cb) {
        conn.query( `CREATE TABLE users (
            user_id INT(6) NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP NULL,
            PRIMARY KEY (user_id)
        );`, function(err,res){
            if (err) {
                console.log(err);
            }
            cb();
        });
    },
    "down": function(conn,cb){
        conn.query("DROP TABLE users;", function (err, res){
            if (err) {
                console.log(err);
            }
            cb();
        });
    }
    
}