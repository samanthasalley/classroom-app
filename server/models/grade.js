class Grade {
  constructor(data) {
    this.student = Number(data.studentId);
    this.item = Number(data.itemId);
    this.actualScore = Number(data.actualScore);
  }
}

module.exports = Grade;