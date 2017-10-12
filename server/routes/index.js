const express                = require('express'),
      router                 = express.Router(),
      gradeController        = require('../controllers/gradesController.js'),
      studentController      = require('../controllers/studentController.js'),
      gradedItemsController  = require('../controllers/gradedItemsController.js');

router
  .route('/')
  .get((req, res) => res.status(200).send({'message': 'Successfully hit Student API!'}));

router
  .route('/students')
  .get(studentController.getAllStudents)
  .post(studentController.addStudent);

router
  .route('/graded-items')
  .get(gradedItemsController.getAllItems)
  .post(gradedItemsController.addItem);

router
  .route('/grades')
  .get(gradeController.getAllGrades);

router
  .route('/students/:studentId/grades')
  .get(gradeController.getGradesByStudent)
  .post(gradeController.addGrade);

router
  .route('/students/:studentId/grades/:gradeId')
  .delete(gradeController.deleteGrade);

module.exports = router;