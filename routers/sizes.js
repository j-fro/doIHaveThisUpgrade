var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var router = express.Router();

var DB_NAME = 'inventory';
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/' + DB_NAME;

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
    // Returns all sizes from the database
    console.log('Getting sizes');
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            var query = client.query('SELECT * FROM sizes', function(err, result) {
                if(err) {
                    console.log(err);
                    res.sendStatus(400);
                    done();
                } else {
                    console.log('Result:', result.rows);
                    res.send(result.rows);
                    // Close the connection
                    done();
                }
            });
        }
    });
});

router.post('/', function(req, res) {
    // Adds a new size to the database
    console.log('Adding a new color:', req.body);
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            console.log(err);
            res.sendStatus(400);
            done();
        } else {
            client.query('INSERT INTO sizes (size) VALUES ($1)',
                         [req.body.size], function(err) {
                if(err) {
                    console.log(err);
                    res.sendStatus(400);
                    done();
                } else {
                    console.log('Successfully addded a size');
                    res.sendStatus(200);
                    done();
                }
            });
        }
    });
});

router.delete('/', function(req, res) {
    // Deletes a size from the database
    console.log('Deleting a size:', req.body);
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            console.log(err);
            res.sendStatus(400);
            done();
        } else {
            client.query('DELETE FROM sizes WHERE id=$1',
                         [req.body.id], function(err) {
                if(err) {
                    console.log(err);
                    res.sendStatus(400);
                    done();
                } else {
                    console.log('Successfully deleted a size');
                    res.sendStatus(200);
                    done();
                }
            });
        }
    });
});

module.exports = router;
