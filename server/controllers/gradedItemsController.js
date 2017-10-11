const GradedItem = require('../models/gradedItem.js'),
  db = require('../models/database');

const GradedItemsController = {};

GradedItemsController.getAllItems = (req, res) => {
  db.getAll('Graded_Items')
    .then(items => res.status(200).send(items))
    .catch(err => res.status(404).send(err));
};

GradedItemsController.addItem = (req, res) => {
  let newItem = new GradedItem({
    name: req.body.name,
    assignedDate: req.body.assignedDate,
    dueDate: req.body.dueDate,
    possibleScore: req.body.possibleScore
  });

  const query = {
    text: 'INSERT INTO Graded_Items(name, assignedDate, dueDate, possibleScore) VALUES($1, $2, $3, $4) RETURNING _id',
    values: Object.values(newItem)
  };

  db.conn.one(query)
    .then(createdItem => res.status(201).send({ 'msg': 'Graded item successfully created', 'id':createdItem._id }))
    .catch(err => res.status(404).send(err));
};

module.exports = GradedItemsController;