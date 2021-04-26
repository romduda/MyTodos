const express = require('express');

const { addUser } = require('./controllers/userController');
const {
  getLists,
  addList,
  deleteList,
} = require('./controllers/listController');
const {
  addSection,
  updateSection,
  deleteSection,
} = require('./controllers/sectionController');
const {
  addNewTask,
  addExistingTask,
  updateTask,
} = require('./controllers/taskController');

const router = express.Router();

// Users
router.post('/users', addUser);

// Lists
router.get('/users/:userId/lists', getLists);

router.post('/users/:userId/lists', addList);

router.delete('/users/:userId/lists/:listId', deleteList);

// Sections

router.post('/users/:userId/lists/:listId/sections', addSection);

router.put('/users/:userId/lists/:listId/sections/:sectionId', updateSection);

router.delete('/users/:userId/lists/:listId/sections/:sectionId', deleteSection);

// Tasks

router.post('/users/:userId/lists/:listId/sections/:sectionId/tasks', addNewTask);

router.put('/users/:userId/lists/:listId/sections/:sectionId/tasks', addExistingTask);

router.put('/users/:userId/tasks/:taskId', updateTask);

module.exports = router;
