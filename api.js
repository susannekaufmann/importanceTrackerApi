var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.port || 3000;
var router = express.Router();


app.use('/api/tasks', router);
app.listen(port);

/**
 * serves as our database for now.
 */
var tasks = [{
    'taskId': 1,
    'task': 'Create ImportanceTracker API',
    'dateAdded': 'September 2, 2017 03:24:00',
    'dateUpdated': 'September 2, 2017 03:24:00',
    'dateDue': 'December 2, 2017 03:24:00',
    'dateCompleted': 'December 2, 2017 03:24:00',
    'communicationType': 'igotthis',
    'taskType': 'strategic',
    'ownerId': '1',
    'entityId': '1'
}];

/* get all tasks */
router.get('/', function(req, res) {
    res.json(tasks);
});

/* get specific task */
router.get('/:id', function(req, res) {
    var taskId = parseInt(req.params.id);
    /* filter by taskId; and show the first item in response array [0] */
    var currentTask = tasks.filter(e => e.taskId === taskId)[0];

    if (currentTask) {
        res.json(currentTask);
    } else {
        res.sendStatus(404);
    }
});