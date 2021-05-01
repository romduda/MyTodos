const user = require('../models/user');
const list = require('../models/list');
const task = require('../models/task');

// This is creating a task that doesn't exist yet in any list
async function addNewTask(req, res) {
  const { userId } = req.params;
  const { listId } = req.params;
  const { sectionId } = req.params;
  try {
    const newTask = await task.create({
      title: req.body.title,
      user: userId,
      lists: [listId],
      // sections: [sectionId],
    });
    // console.log(newTask)
    const currList = await list.findById(listId);
    // console.log(currList)
    const section = await currList.sections.id(sectionId);
    // console.log(section)
    section.tasks = [newTask._id, ...section.tasks]; // mock or not test ?
    await currList.save(); // mock or not test ?
    const updatedUser = await user.findById(userId);
    const populatedUser = await updatedUser.populate({
      path: 'lists',
      populate: {
        path: 'sections',
        populate: {
          path: 'tasks',
          populate: {
            path: 'lists',
            select: 'title color',
          },
        },
      },
    })
      .execPopulate();
    res.status(201);
    res.send(populatedUser.lists);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not add task' });
    console.error(error); // eslint-disable-line
  }
}

async function addExistingTask(req, res) {
  const { userId } = req.params;
  const { listId } = req.params;
  const { sectionId } = req.params;
  if (!req.body.taskId) {
    return res.status(400).send({ message: 'Body did not include "taskId" property' });
  }
  try {
    await task.findByIdAndUpdate(
      req.body.taskId,
      { $addToSet: { lists: listId } },
      { new: true },
    );
    const currList = await list.findById(listId);
    const section = await currList.sections.id(sectionId);
    section.tasks = [req.body.taskId, ...section.tasks];
    await currList.save();
    const updatedUser = await user.findById(userId);
    const populatedUser = await updatedUser.populate({
      path: 'lists',
      populate: {
        path: 'sections',
        populate: {
          path: 'tasks',
          populate: {
            path: 'lists',
            select: 'title color',
          },
        },
      },
    })
      .execPopulate();
    res.status(201);
    return res.send(populatedUser.lists);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not add task' });
    return console.error(error); // eslint-disable-line
  }
}

// I think use this also for removing a task from a particular list,
// without deleting it from all the lists it's in.
async function updateTask(req, res) {
  const { taskId } = req.params;
  const { userId } = req.params;
  try {
    await task.findByIdAndUpdate(
      taskId,
      req.body,
      { new: true },
    );
    const currUser = await user.findById(userId);
    const populatedUser = await currUser.populate({
      path: 'lists',
      populate: {
        path: 'sections',
        populate: {
          path: 'tasks',
          populate: {
            path: 'lists',
            select: 'title color',
          },
        },
      },
    })
      .execPopulate();
    res.status(200);
    res.send(populatedUser.lists);
  } catch (error) {
    res.status(400);
    res.send({ error: JSON.stringify(error), message: 'Could not update task' });
    console.error(error); // eslint-disable-line
  }
}

async function deleteTask(req, res) {
  const { userId } = req.params;
  const { listId } = req.params;
  const { sectionId } = req.params;
  try {
    const currUser = await user.findById(userId);
    const list = await currUser.lists.id(listId);
    const section = await list.sections.id(sectionId);
    await section.remove();
    const updatedUser = await currUser.save();
    res.status(201);
    res.send(updatedUser);
  } catch (error) {
    res.status(400);
    res.send({ error: JSON.stringify(error), message: 'Could not delete section' });
    console.error(error); // eslint-disable-line
  }
}

module.exports = {
  addNewTask,
  addExistingTask,
  updateTask,
  deleteTask,
};
