class Student {
  constructor(data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dob = new Date(data.dob);
    this.grade = Number(data.grade);
  }
}

module.exports = Student;