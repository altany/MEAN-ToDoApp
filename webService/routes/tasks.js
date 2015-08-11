var express = require('express');
var router = express.Router();

/*
 * GET /tasks.
 */
router.get('/', function(req, res) {
    var db = req.db;
    db.collection('taskcollection').find().toArray( function (err, items) {
        res.json(items);
    });
});

/*
 * GET /tasks/:id.
 */
router.get('/:id', function(req, res) {
    var db = req.db;
	db.collection('taskcollection').findById(req.params.id, function (err, items) {
        res.json(items);
    });
});

/*
 * POST to /tasks/new.
 */
router.post('/new', function(req, res) {
	if(!req.body) { return res.send(400); } // 6
    var db = req.db;
	req.body.done = false;
    db.collection('taskcollection').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to tasks/:id.
 */
router.delete('/:id', function(req, res) {
    var db = req.db;
    var taskToDelete = req.params.id;
    db.collection('taskcollection').removeById(taskToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;

/*
 * PUT to /tasks/:id.
 */
router.put('/:id', function(req, res) {
    var db = req.db;
	if(!req.body) { return res.send(400); } // 6
   req.body.done = req.body.done === true || req.body.done==='true'; db.collection('taskcollection').findById(req.params.id, function(err, result){
		if(err) { return res.send(500, e); }
		if(!result) { return res.send(404); }
		db.collection('taskcollection').updateById(req.params.id, req.body, function(errUpd) { 
            if(errUpd) {
                return res.send(500, errUpd);
            }
            res.send(result);
        });
    });
	
});
