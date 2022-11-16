const express = require('express');
const {getalltasks,createsingletask,getsingletask,updatetask,deletetask} = require('./controller/tasks');

const router = express.Router();

router.route('/').get(getalltasks).post(createsingletask);
router.route('/:id').get(getsingletask).patch(updatetask).delete(deletetask);



// exporting the router
module.exports = router;
