const Student = require('../models').Student;

const StudentController = {};

StudentController.getAllStudents = (req, res) => {
  console.log('getting all students');
};

StudentController.addStudent = (req, res) => {
  console.log('adding new student');
  let newStudent = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: new Date(req.body.dob),
    grade: Number(req.body.grade)
  };

  return Student
    .create(newStudent)
    .then(createdStudent => res.status(201).send(createdStudent))
    .catch(err => {
      console.log('error creating new student', err);
      res.status(400).send(err)
    });
};

module.exports = StudentController;