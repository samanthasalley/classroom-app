import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

class GradesByAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grades: this.getAllGrades()
    };

    this.getAllGrades = this.getAllGrades.bind(this);
  }

  getAllGrades() {
    fetch('http://localhost:8080/api/grades')
      .then((response) => response.json())
      .then(grades => {
        this.setState({
          grades: grades
        });
      })
      .catch(ex => console.log('error getting grades', ex));
  }

  render() {
    const data = [];
    if (this.state.grades) {
      const gradesByAssignment = {};
      this.state.grades.filter(grade => grade.grade_id && grade.assignment_id).map(grade => {
        if (!gradesByAssignment[grade.assignment_id]) gradesByAssignment[grade.assignment_id] = { 'name': grade.assignment_name, 'possible': grade.assignment_possiblescore, 'actual': 0, 'totalGrades': 0 };
        gradesByAssignment[grade.assignment_id].totalGrades += 1;
        gradesByAssignment[grade.assignment_id].actual += grade.actual_score;
        gradesByAssignment[grade.assignment_id].mean = Math.floor((gradesByAssignment[grade.assignment_id].actual / gradesByAssignment[grade.assignment_id].totalGrades));
        return grade;
      });
      Object.keys(gradesByAssignment).map(aKey => {
        data.push({ x: gradesByAssignment[aKey].name, y: gradesByAssignment[aKey].possible, color: '#EB5281' });
        data.push({ x: gradesByAssignment[aKey].name, y: gradesByAssignment[aKey].mean, color: '#54B9D1' });
        return aKey;
      });
    }
    return (
      <div className="Grades-By-Assignment" style={{ 'textAlign': 'center', 'width':'100%' }}>
        <header>
          <h3>Average Grades By Assignment</h3>
        </header>
        <div style={{ 'margin': '100px auto', 'width':'700px' }}>
          <XYPlot height={700} width={700} xType={'ordinal'}>
            <VerticalBarSeries colorType={'literal'} data={data ? data : null} />
            <XAxis />
            <YAxis />
          </XYPlot>
        </div>
      </div>
    );
  }
}

export default GradesByAssignment;