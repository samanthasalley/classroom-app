class GradedItem {
  constructor(data) {
    this.name = data.name;
    this.assignedDate = new Date(data.assignedDate);
    this.dueDate = new Date(data.dueDate);
    this.possibleScore = Number(data.possibleScore);
  }
}

module.exports = GradedItem;