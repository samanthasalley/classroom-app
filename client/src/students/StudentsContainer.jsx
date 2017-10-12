import React, { Component } from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar';
import ViewStudentsBtn from './assets/ViewStudentsBtn';
import NewStudentBtn from './assets/NewStudentBtn';
import StudentTable from './StudentTable';
import StudentGradeTable from '../grades/StudentGradeTable';
import NewGradeForm from '../grades/NewGradeForm';
import NewStudentForm from './NewStudentForm';

const resetNewStudent = () => {
  return {
    firstName: '',
    lastName: '',
    dob: {},
    grade: ''
  };
};

const resetNewGrade = () => {
  return {
    student: '',
    item: '',
    actualScore: ''
  };
};

class StudentsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      assignments: this.getAllAssignments(),
      students: this.getAllStudents(),
      showStudents: false,
      showStudentGrades: false,
      studentGradesIdx: null,
      showAddStudent: false,
      newStudent: resetNewStudent(),
      studentGrades: [9, 10, 11, 12],
      showAddGrade: false,
      newGrade: resetNewGrade()
    };

    this.getAllAssignments = this.getAllAssignments.bind(this);

    this.getAllStudents = this.getAllStudents.bind(this);
    this.getStudentGrades = this.getStudentGrades.bind(this);

    this.createStudent = this.createStudent.bind(this);
    this.addNewStudent = this.addNewStudent.bind(this);
    this.validateNewStudent = this.validateNewStudent.bind(this);
    this.handleNewStudentDOBChange = this.handleNewStudentDOBChange.bind(this);
    this.handleNewStudentInputChange = this.handleNewStudentInputChange.bind(this);

    this.addNewGrade = this.addNewGrade.bind(this);
    this.validateNewGrade = this.validateNewGrade.bind(this);
    this.handleNewGradeInputChange = this.handleNewGradeInputChange.bind(this);
    this.handleNewGradeStudentChange = this.handleNewGradeStudentChange.bind(this);
    this.handleNewGradeAssignmentChange = this.handleNewGradeAssignmentChange.bind(this);

    this.deleteGrade = this.deleteGrade.bind(this);
  }

  getAllAssignments() {
    fetch('http://localhost:8080/api/graded-items')
      .then((response) => response.json())
      .then(assignments => {
        this.setState({
          assignments: assignments
        });
      })
      .catch(ex => console.log('error getting assignments', ex));
  }

  getAllStudents() {
    fetch('http://localhost:8080/api/students')
      .then((response) => response.json())
      .then(students => {
        this.setState({
          students: students,
          showStudents: true,
          showStudentGrades: false,
          showAddStudent: false,
          showAddGrade: false
        });
      })
      .catch(ex => console.log('error getting students', ex));
  }

  getStudentGrades(studentId, studentIdx) {
    let uri = `http://localhost:8080/api/students/${studentId}/grades`;
    fetch(uri)
      .then((response) => response.json())
      .then(studentGrades => {
        let students = this.state.students.slice(0);
        students[studentIdx].grades = studentGrades;
        this.setState({
          students: students,
          showStudents: false,
          showAddStudent: false,
          showAddGrade: false,
          showStudentGrades: true,
          studentGradesIdx: studentIdx
        });
      })
      .catch(ex => console.log('error getting students', ex));
  }

  createStudent() {
    let newStudent = Object.assign(this.state.newStudent);
    fetch('http://localhost:8080/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    })
      .then(response => response.json())
      .then(createdStudent => {
        let resetStudent = resetNewStudent();
        setTimeout(this.getAllStudents, 0);
        this.setState({
          showAddStudent: false,
          newStudent: resetStudent
        });
      })
      .catch(ex => console.log('error creating new student', ex));
  }

  validateNewStudent(ev) {
    ev.preventDefault();
    let newStudent = this.state.newStudent;
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.dob || !newStudent.grade) return;
    this.createStudent();
  }

  addNewStudent() {
    this.setState({
      showStudents: false,
      showAddStudent: true,
      showAddGrade: false
    });
  }

  handleNewStudentDOBChange(ev, date) {
    const newStudent = Object.assign(this.state.newStudent);
    newStudent.dob = date;
    this.setState({
      newStudent: newStudent
    });
  }

  handleNewStudentInputChange(ev) {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const newStudent = Object.assign(this.state.newStudent);
    newStudent[name] = value;
    this.setState({
      newStudent: newStudent
    });
  }

  deleteGrade(studentId, gradeId) {
    let uri = `http://localhost:8080/api/students/${studentId}/grades/${gradeId}`;
    fetch(uri, {method: 'DELETE'})
      .then(response => response.json())
      .then(parsedRes => this.getStudentGrades(parsedRes.deletedGrade.student, this.state.studentGradesIdx))
      .catch(ex => console.log('error deleting grade', ex));
  }

  createGrade() {
    let newGrade = Object.assign(this.state.newGrade);
    let studentId = this.state.students[this.state.studentGradesIdx]._id;
    let uri = `http://localhost:8080/api/students/${studentId}/grades`;
    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGrade)
    })
      .then(response => response.json())
      .then(createdGrade => {
        let resetGrade = resetNewGrade();
        setTimeout(() => this.getStudentGrades(createdGrade.student, this.state.studentGradesIdx), 0);
        this.setState({
          showAddGrade: false,
          newGrade: resetGrade
        });
      })
      .catch(ex => console.log('error creating new grade', ex));
  }

  validateNewGrade(ev) {
    ev.preventDefault();
    let newGrade = this.state.newGrade;
    newGrade.student = this.state.students[this.state.studentGradesIdx]._id;
    if (!newGrade.student || !newGrade.item || !newGrade.actualScore) return;
    console.log('ready to save newGrade: ', newGrade);
    this.createGrade();
  }

  addNewGrade(studentIdx) {
    this.setState({
      showStudents: false,
      showAddStudent: false,
      showAddGrade: true,
      studentGradesIdx: studentIdx
    });
  }

  handleNewGradeAssignmentChange(ev, idx, value) {
    const newGrade = Object.assign(this.state.newGrade);
    newGrade.item = value;
    this.setState({
      newGrade: newGrade
    });
  }

  handleNewGradeInputChange(ev) {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const newGrade = Object.assign(this.state.newGrade);
    newGrade[name] = value;
    this.setState({
      newGrade: newGrade
    });
  }

  handleNewGradeStudentChange(ev) {
    console.log('Cannot change student');
  }

  render() {
    return (
      <div className="Students-Container">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Student Toolbar" />
          </ToolbarGroup>
          <ToolbarGroup>
            <ViewStudentsBtn getAllStudents={this.getAllStudents} />
            <ToolbarSeparator />
            <NewStudentBtn addNewStudent={this.addNewStudent} />
          </ToolbarGroup>
        </Toolbar>
        {this.state.showStudents ? <StudentTable
          students={this.state.students}
          getStudentGrades={this.getStudentGrades}
          addNewGrade={this.addNewGrade}
        /> : null}
        {this.state.showStudentGrades ? <StudentGradeTable
          deleteGrade={this.deleteGrade}
          student={this.state.students[this.state.studentGradesIdx]}
          studentGrades={this.state.students[this.state.studentGradesIdx].grades}
        /> : null}
        {this.state.showAddGrade ? <NewGradeForm
          newGrade={this.state.newGrade}
          student={this.state.students[this.state.studentGradesIdx]}
          assignments={this.state.assignments}
          validateNewGrade={this.validateNewGrade}
          handleNewGradeInputChange={this.handleNewGradeInputChange}
          handleNewGradeStudentChange={this.handleNewGradeStudentChange}
          handleNewGradeAssignmentChange={this.handleNewGradeAssignmentChange}
        /> : null}
        {this.state.showAddStudent ? <NewStudentForm
          newStudent={this.state.newStudent}
          validateNewStudent={this.validateNewStudent}
          handleNewStudentDOBChange={this.handleNewStudentDOBChange}
          handleNewStudentInputChange={this.handleNewStudentInputChange}
        /> : null}
      </div>
    );
  }
};

export default StudentsContainer;