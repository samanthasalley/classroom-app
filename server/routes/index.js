const express            = require('express'),
      router             = express.Router(),
      studentController  = require('../controllers/studentController.js');

router
  .route('/')
  .get((req, res) => res.status(200).send({'message': 'Successfully hit Student API!'}));

router
  .route('/students')
  .get(studentController.getAllStudents)
  .post(studentController.addStudent);

module.exports = router;