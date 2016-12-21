var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var router = express.Router();

var DB_NAME = 'inventory';
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/' + DB_NAME;

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
    // Returns all items from the database
    console.log('Getting items');
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            var queryString = 'SELECT items.id, items.name, colors.color, sizes.size ' +
            'FROM items ' +
            'JOIN colors ON items.color_id=colors.id ' +
            'JOIN sizes ON items.size_id=sizes.id';
            var query = client.query(queryString, function(err, result) {
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

router.put('/', function(req, res) {
    // Returns all items from the database
    console.log('Searching items:', req.body);
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            var queryString = 'SELECT items.id, items.name, colors.color, sizes.size ' +
            'FROM items ' +
            'JOIN colors ON items.color_id=colors.id ' +
            'JOIN sizes ON items.size_id=sizes.id ' +
            'WHERE ';
            var searchParameters = [];
            var searchStrings = [];
            if(req.body.name) {
                searchParameters.push(req.body.name);
                searchStrings.push("items.name LIKE $");
            }
            if(req.body.colorId) {
                searchParameters.push(req.body.colorId);
                searchStrings.push('items.color_id=$');
            }
            if(req.body.sizeId) {
                searchParameters.push(req.body.sizeId);
                searchStrings.push('items.size_id=$');
            }
            for (var i = 0; i < searchStrings.length; i++) {
                searchStrings[i] = searchStrings[i].replace('$', '$' + (i + 1));
            }
            queryString += searchStrings.join(' AND ');
            console.log(queryString);
            var query = client.query(queryString, searchParameters, function(err, result) {
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
    // Adds a new item to the database
    console.log('Adding a new item:', req.body);
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            console.log(err);
            res.sendStatus(400);
            done();
        } else {
            client.query('INSERT INTO items (name, color_id, size_id) VALUES ($1, $2, $3)',
                         [req.body.name, req.body.colorId, req.body.sizeId], function(err) {
                if(err) {
                    console.log(err);
                    res.sendStatus(400);
                    done();
                } else {
                    console.log('Successfully addded an item');
                    res.sendStatus(200);
                    done();
                }
            });
        }
    });
});

router.delete('/', function(req, res) {
    // Deletes a size from the database
    console.log('Deleting an item:', req.body);
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            console.log(err);
            res.sendStatus(400);
            done();
        } else {
            client.query('DELETE FROM items WHERE id=$1',
                         [req.body.id], function(err) {
                if(err) {
                    console.log(err);
                    res.sendStatus(400);
                    done();
                } else {
                    console.log('Successfully deleted an item');
                    res.sendStatus(200);
                    done();
                }
            });
        }
    });
});

module.exports = router;
