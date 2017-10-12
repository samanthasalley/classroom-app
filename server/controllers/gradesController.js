const Grade = require('../models/grade.js'),
  db = require('../models/database');

const GradeController = {};

GradeController.getAllGrades = (req, res) => {
  const query = {
    text: 'SELECT g._id as grade_id, g.actualscore as actual_score, s._id as student_id, s.firstname as student_firstname, s.lastname as student_lastname, s.grade as student_grade, gi._id as assignment_id, gi.name as assignment_name, gi.possiblescore as assignment_possiblescore FROM Grades g FULL OUTER JOIN Students s ON g.student = s._id FULL OUTER JOIN Graded_Items gi ON g.item = gi._id'
  };

  db.conn.any(query)
    .then(allGrades => res.status(200).send(allGrades))
    .catch(err => res.status(404).send(err));
};

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