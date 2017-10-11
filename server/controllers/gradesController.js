const Grade = require('../models/grade.js'),
  db = require('../models/database');

const GradeController = {};

GradeController.getGradesByStudent = (req, res) => {
  const query = {
    text: 'SELECT * FROM Grades WHERE student = $1',
    values: [req.params.studentId]
  };

  db.conn.any(query)
    .then(studentGrades => res.status(200).send(studentGrades))
    .catch(err => res.status(404).send(err));
};

GradeController.addGrade = (req, res) => {
  let newGrade = new Grade({
    studentId: req.params.studentId,
    itemId: req.params.gradedItemId,
    actualScore: req.body.actualScore
  });

  const query = {
    text: 'INSERT INTO Grades(student, item, actualScore) VALUES($1, $2, $3) RETURNING _id',
    values: Object.values(newGrade)
  };

  db.conn.one(query)
    .then(createdGrade => res.status(201).send({ 'msg': 'Grade successfully created', 'id': createdGrade._id }))
    .catch(err => {
      console.log('err: ', err);
      res.status(404).send(err);
    });
};

module.exports = GradeController;