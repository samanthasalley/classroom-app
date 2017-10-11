import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import LoggedInMenu from './menus/LoggedInMenu';
import StudentsContainer from './students/StudentsContainer';
import AssignmentContainer from './assignments/AssignmentContainer';

const resetNewStudent = () => {
  return {
    firstName: '',
    lastName: '',
    dob: '',
    grade: ''
  };
};

const resetNewAssignment = () => {
  return {
    name: '',
    assignedDate: {},
    dueDate: {},
    possibleScore: ''
  };
};

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      students: [],
      showStudentContainer: false,
      showStudents: false,
      showAddStudent: false,
      newStudent: resetNewStudent(),
      studentGrades: [9, 10, 11, 12],
      assignments: [],
      showAssignmentContainer: false,
      showAssignments: false,
      showAddAssignment: false,
      newAssignment: resetNewAssignment()
    };

    this.getAllStudents = this.getAllStudents.bind(this);
    this.validateNewStudent = this.validateNewStudent.bind(this);
    this.createStudent = this.createStudent.bind(this);
    this.addNewStudent = this.addNewStudent.bind(this);
    this.handleNewStudentInputChange = this.handleNewStudentInputChange.bind(this);

    this.getAllAssignments = this.getAllAssignments.bind(this);
    this.validateNewAssignment = this.validateNewAssignment.bind(this);
    this.createAssignment = this.createAssignment.bind(this);
    this.addNewAssignment = this.addNewAssignment.bind(this);
    this.handleNewAssignmentInputChange = this.handleNewAssignmentInputChange.bind(this);
    this.handleNewAssignmentDueDateChange = this.handleNewAssignmentDueDateChange.bind(this);
    this.handleNewAssignmentAssignedDateChange = this.handleNewAssignmentAssignedDateChange.bind(this);
  }

  getAllStudents(){
    fetch('http://localhost:8080/api/students')
      .then((response) => response.json())
      .then(students => {
        this.setState({
          students:students,
          showStudentContainer: true,
          showStudents: true,
          showAddStudent: false,
          showAssignments: false
        });
      })
      .catch(ex => console.log('error getting students', ex));
  }

  createStudent(){
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

  validateNewStudent(ev){
    ev.preventDefault();
    let newStudent = this.state.newStudent;
    if(!newStudent.firstName || !newStudent.lastName || !newStudent.dob || !newStudent.grade) return;
    this.createStudent();
  }

  addNewStudent(){
    this.setState({
      showStudents: false,
      showAddStudent: true
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

  getAllAssignments(){
    fetch('http://localhost:8080/api/graded-items')
      .then((response) => response.json())
      .then(assignments => {
        this.setState({
          assignments:assignments,
          showStudentContainer: false,
          showStudents: false,
          showAssignmentContainer: true,
          showAssignments: true
        });
      })
      .catch(ex => console.log('error getting assignments', ex));
  }

  createAssignment(){
    let newAssignment = Object.assign(this.state.newAssignment);
    fetch('http://localhost:8080/api/graded-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAssignment)
    })
    .then(response => response.json())
    .then(createdStudent => {
      let resetAssignment = resetNewAssignment();
      setTimeout(this.getAllAssignments, 0);
      this.setState({
        showAddAssignment: false,
        newAssignment: resetAssignment
      });
    })
    .catch(ex => console.log('error creating new assignment', ex));
  }

  validateNewAssignment(ev){
    ev.preventDefault();
    let newAssignment = this.state.newAssignment;
    if(!newAssignment.name || !newAssignment.assignedDate || !newAssignment.dueDate || !newAssignment.possibleScore) return;
    this.createAssignment();
  }

  addNewAssignment(){
    this.setState({
      showAssignments: false,
      showAddAssignment: true
    });
  }
  
  handleNewAssignmentInputChange(ev) {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const newAssignment = this.state.newAssignment;
      newAssignment[name] = value;
    // console.log(`input change on ${name} - new value is ${value}`);
    this.setState({
        newAssignment: newAssignment
      });
  }

  handleNewAssignmentDueDateChange(ev, date) {
    const newAssignment = Object.assign(this.state.newAssignment);
      newAssignment.dueDate = date;
    this.setState({
      newAssignment: newAssignment
    });
  }

  handleNewAssignmentAssignedDateChange(ev, date) {
    const newAssignment = Object.assign(this.state.newAssignment);
      newAssignment.assignedDate = date;
    console.log('ready to update newAssignment with updated assigned date', newAssignment);
    this.setState({
      newAssignment: newAssignment
    });
  }

  render() {
    return (
      <div className="App">
        <AppBar 
          title="Class-App"
          titleStyle={{textAlign: 'center'}}
          iconElementRight={
            <LoggedInMenu 
              getAllStudents={this.getAllStudents} 
              getAllAssignments={this.getAllAssignments}
            />
          }
          showMenuIconButton={false}
        />
        {(this.state.showStudentContainer) ? <StudentsContainer 
          students={this.state.students} 
          showStudents={this.state.showStudents}
          showAddStudent={this.state.showAddStudent}
          newStudent={this.state.newStudent}
          validateNewStudent={this.validateNewStudent}
          handleNewStudentInputChange={this.handleNewStudentInputChange}
          addNewStudent={this.addNewStudent} 
          /> : null}
        {(this.state.showAssignmentContainer) ? <AssignmentContainer 
          assignments={this.state.assignments} 
          showAssignments={this.state.showAssignments}
          showAddAssignment={this.state.showAddAssignment}
          newAssignment={this.state.newAssignment}
          validateNewAssignment={this.validateNewAssignment}
          handleNewAssignmentInputChange={this.handleNewAssignmentInputChange}
          handleNewAssignmentDueDateChange={this.handleNewAssignmentDueDateChange}
          handleNewAssignmentAssignedDateChange={this.handleNewAssignmentAssignedDateChange}
          addNewAssignment={this.addNewAssignment} 
          /> : null}
      </div>
    );
  }
}

export default App;
