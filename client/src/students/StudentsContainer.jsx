import React, { Component } from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar';
import NewStudentBtn from './assets/NewStudentBtn';
import StudentTable from './StudentTable';
import NewStudentForm from './NewStudentForm';

const resetNewStudent = () => {
  return {
    firstName: '',
    lastName: '',
    dob: {},
    grade: ''
  };
};

class StudentsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      students: this.getAllStudents(),
      showStudents: false,
      showAddStudent: false,
      newStudent: resetNewStudent(),
      studentGrades: [9, 10, 11, 12]
    };

    this.getAllStudents = this.getAllStudents.bind(this);
    this.validateNewStudent = this.validateNewStudent.bind(this);
    this.createStudent = this.createStudent.bind(this);
    this.addNewStudent = this.addNewStudent.bind(this);
    this.handleNewStudentDOBChange = this.handleNewStudentDOBChange.bind(this);
    this.handleNewStudentInputChange = this.handleNewStudentInputChange.bind(this);
  }

  getAllStudents() {
    fetch('http://localhost:8080/api/students')
      .then((response) => response.json())
      .then(students => {
        this.setState({
          students: students,
          showStudentContainer: true,
          showStudents: true,
          showAddStudent: false,
          showAssignmentContainer: false,
          showAssignments: false
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
      showAddStudent: true
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
    // console.log(`input change on ${name} - new value is ${value}`);
    this.setState({
      newStudent: newStudent
    });
  }

  render() {
    return (
      <div className="Students-Container">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Student Toolbar" />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator />
            <NewStudentBtn addNewStudent={this.addNewStudent} />
          </ToolbarGroup>
        </Toolbar>
        {/* <StudentToolbar addNewStudent={props.addNewStudent} /> */}
        {this.state.showStudents ? <StudentTable students={this.state.students} /> : null}
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