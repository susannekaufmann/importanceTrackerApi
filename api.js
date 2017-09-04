// TODO maybe a better name than ENUMS
const ENUMS = require('./taskEnum');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();


app.use('/api/tasks', router);
app.listen(port);

console.log('Listening to port...' + port);


/**
 * serves as our database for now.
 */
var tasks = [{
    'taskId': '1',
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
    var taskId = req.params.id;
    /* filter by taskId; and show the first item in response array [0] */
    var currentTask = tasks.filter(e => e.taskId === taskId)[0];

    if (currentTask) {
        res.json(currentTask);
    } else {
        res.sendStatus(404);
    }
});

function isValidTask(task) {
    if (!task.taskId)
        return false;
    if (!task.task)
        return false;
    if (!task.dateAdded)
        return false;
    if (!task.dateUpdated)
        return false;
    if (!task.dateDue)
        return false;
    if (!task.dateCompleted)
        return false;
    if (task.taskType !== ENUMS.TaskEnum.STRATEGIC &&
        task.taskType !== ENUMS.TaskEnum.HOMERUNS &&
        task.taskType !== ENUMS.TaskEnum.SHOULDNOTDO &&
        task.taskType !== ENUMS.TaskEnum.HOUSEKEEPING)
        return false;
    // communication type is allowed to be blank; you may not want to commmunicate
    if (task.communicationType) {
        if (task.communicationType !== ENUMS.CommunicationTypeEnum.IGOTTHIS &&
            task.communicationType !== ENUMS.CommunicationTypeEnum.SORRY &&
            task.communicationType !== ENUMS.CommunicationTypeEnum.ELIMINATED)
            return false;
    }
    return true;
}

// TODO Support add thru array; in fact only support thru array; never single element
router.post('/', function(req, res) {
    var task = req.body;
    var isValid = isValidTask(task);
    if (isValid) {
        tasks.push(task);
        res.send(task);
    } else {
        // TODO: Come up with a better response here  ok!
        res.sendStatus(500);
    }
});

router.put('/:id', function(req, res) {
    var taskId = req.params.id;
    var currentTask = tasks.filter(t => t.taskId === taskId)[0];
    if (currentTask) {
        let task = req.body;
        var isValid = isValidTask(task);
        if (isValid) {
            currentTask.task = task.task;
            currentTask.taskType = task.taskType;
            currentTask.communicationType = task.communicationType;
            currentTask.dateAdded = task.dateAdded;
            currentTask.dateCompleted = task.dateCompleted;
            currentTask.dateDue = task.dateDue;
            currentTask.dateUpdated = task.dateUpdated;
            currentTask.entityId = task.entityId;
            currentTask.ownerId = task.ownerId;
            res.sendStatus(204);
        } else {
            // TODO: Come up with a better response here  ok!            
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', function(req, res) {
    var taskId = req.params.id;
    var currentTask = tasks.filter(t => t.taskId === taskId)[0];
    if (currentTask) {
        // ok; here we set the memory representation to all tasks minus newly deleted
        tasks = tasks.filter(t => t.taskId !== taskId);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});