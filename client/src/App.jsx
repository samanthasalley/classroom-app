import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import LoggedInMenu from './menus/LoggedInMenu';
import StudentsContainer from './students/StudentsContainer';
import AssignmentTable from './assignments/AssignmentTable';

const resetNewStudent = () => {
  return {
    firstName: '',
    lastName: '',
    dob: '',
    grade: ''
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
      showAssignments: false
    };

    this.getAllStudents = this.getAllStudents.bind(this);
    this.getAllAssignments = this.getAllAssignments.bind(this);
    this.validateNewStudent = this.validateNewStudent.bind(this);
    this.createStudent = this.createStudent.bind(this);
    this.addNewStudent = this.addNewStudent.bind(this);
    this.handleNewStudentInputChange = this.handleNewStudentInputChange.bind(this);
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
    const newStudent = this.state.newStudent;
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
          showAssignments: true
        });
      })
      .catch(ex => console.log('error getting assignments', ex));
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
        {(this.state.showAssignments && this.state.assignments.length) ? <AssignmentTable assignments={this.state.assignments}/> : null}
      </div>
    );
  }
}

export default App;
