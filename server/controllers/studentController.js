const Student   = require('../models/student.js'),
      db        = require('../models/database');

const StudentController = {};

StudentController.getAllStudents = (req, res) => {
  db.getAll('Students')
    .then(students => res.status(200).send(students))
    .catch(err => res.status(404).send(err));
};

StudentController.addStudent = (req, res) => {
  let newStudent = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    grade: req.body.grade
  });

  const query = {
    text: 'INSERT INTO Students(firstName, lastName, dob, grade) VALUES($1, $2, $3, $4) RETURNING _id',
    values: Object.values(newStudent)
  };

  db.conn.one(query)
    .then(createdStudent => res.status(201).send({'msg':'Student successfully created', 'id': createdStudent._id}))
    .catch(err => res.status(404).send(err));
};

module.exports = StudentController;