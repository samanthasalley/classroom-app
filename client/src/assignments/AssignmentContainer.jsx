import React, { Component } from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar';
import ViewAssignmentsBtn from './assets/ViewAssignmentsBtn';
import NewAssignmentBtn from './assets/NewAssignmentBtn';
import AssignmentTable from './AssignmentTable';
import NewAssignmentForm from './NewAssignmentForm';

const resetNewAssignment = () => {
  return {
    name: '',
    assignedDate: {},
    dueDate: {},
    possibleScore: ''
  };
};

class AssignmentContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      assignments: this.getAllAssignments(),
      showAssignments: false,
      showAddAssignment: false,
      newAssignment: resetNewAssignment()
    };

    this.getAllAssignments = this.getAllAssignments.bind(this);
    this.validateNewAssignment = this.validateNewAssignment.bind(this);
    this.createAssignment = this.createAssignment.bind(this);
    this.addNewAssignment = this.addNewAssignment.bind(this);
    this.handleNewAssignmentInputChange = this.handleNewAssignmentInputChange.bind(this);
    this.handleNewAssignmentDueDateChange = this.handleNewAssignmentDueDateChange.bind(this);
    this.handleNewAssignmentAssignedDateChange = this.handleNewAssignmentAssignedDateChange.bind(this);
  }

  getAllAssignments() {
    fetch('http://localhost:8080/api/graded-items')
      .then((response) => response.json())
      .then(assignments => {
        this.setState({
          assignments: assignments,
          showAssignments: true,
          showAddAssignment: false
        });
      })
      .catch(ex => console.log('error getting assignments', ex));
  }

  createAssignment() {
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

  validateNewAssignment(ev) {
    ev.preventDefault();
    let newAssignment = this.state.newAssignment;
    if (!newAssignment.name || !newAssignment.assignedDate || !newAssignment.dueDate || !newAssignment.possibleScore) return;
    this.createAssignment();
  }

  addNewAssignment() {
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
      <div className="Assignments-Container">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Assignmentss Toolbar" />
          </ToolbarGroup>
          <ToolbarGroup>
            <ViewAssignmentsBtn getAllAssignments={this.getAllAssignments} />
            <ToolbarSeparator />
            <NewAssignmentBtn addNewAssignment={this.addNewAssignment} />
          </ToolbarGroup>
        </Toolbar>
        {this.state.showAssignments ? <AssignmentTable assignments={this.state.assignments} /> : null}
        {this.state.showAddAssignment ? <NewAssignmentForm
          newAssignment={this.state.newAssignment}
          validateNewAssignment={this.validateNewAssignment}
          handleNewAssignmentInputChange={this.handleNewAssignmentInputChange}
          handleNewAssignmentDueDateChange={this.handleNewAssignmentDueDateChange}
          handleNewAssignmentAssignedDateChange={this.handleNewAssignmentAssignedDateChange}
        /> : null}
      </div>
    );
  }
};

export default AssignmentContainer;