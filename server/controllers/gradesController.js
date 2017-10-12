const Grade = require('../models/grade.js'),
  db = require('../models/database');

const GradeController = {};

GradeController.getGradesByStudent = (req, res) => {
  const query = {
    text: 'SELECT g._id as grade_id, s.firstname as student_first_name, s.lastname as student_last_name, gi.name as assignment_name, g.actualscore as actual_score, gi.possiblescore as possible_score FROM Grades g INNER JOIN Students s ON g.student = s._id INNER JOIN Graded_Items gi ON g.item = gi._id WHERE student = $1',
    values: [req.params.studentId]
  };

  db.conn.any(query)
    .then(studentGrades => res.status(200).send(studentGrades))
    .catch(err => res.status(404).send(err));
};

GradeController.addGrade = (req, res) => {
  let newGrade = new Grade({
    studentId: req.params.studentId,
    itemId: req.body.item,
    actualScore: req.body.actualScore
  });

  const query = {
    text: 'INSERT INTO Grades(student, item, actualScore) VALUES($1, $2, $3) RETURNING _id, student',
    values: Object.values(newGrade)
  };

  db.conn.one(query)
    .then(createdGrade => res.status(201).send({ 'msg': 'Grade successfully created', '_id': createdGrade._id, 'student': createdGrade.student }))
    .catch(err => {
      console.log('err: ', err);
      res.status(404).send(err);
    });
};

GradeController.deleteGrade = (req, res) => {
  db.deleteById('Grades', req.params.gradeId)
    .then(deletedGrade => res.status(200).send({'msg': 'Grade successfully deleted', deletedGrade}))
    .catch(err => res.status(400).send(err));
};

module.exports = GradeController;