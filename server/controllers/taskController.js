const user = require('../models/user');
const task = require('../models/task');

// This is creating a task that doesn't exist yet in any list
async function addTask(req, res) {
  const { userId } = req.params;
  const { listId } = req.params;
  const { sectionId } = req.params;
  try {
    const newTask = await task.create({
      title: req.body.title,
      user: userId,
      // lists: [listId],
      // sections: [sectionId],
    });
    const currUser = await user.findById(userId);
    const list = await currUser.lists.id(listId);
    const section = await list.sections.id(sectionId);
    section.tasks = [newTask._id, ...section.tasks];
    const updatedUser = await currUser.save();
    const populatedUser = await updatedUser.populate({
      path: 'lists',
      populate: {
        path: 'sections',
        populate: {
          path: 'tasks',
        },
      },
    })
      .execPopulate();
    res.status(201);
    res.send(populatedUser.lists);
  } catch (error) {
    res.status(400);
    res.send({ error, message: 'Could not add task' });
    console.error(error); // eslint-disable-line
  }
}

// I think use this also for removing a task from a particular list,
// without deleting it from all the lists it's in.
async function updateTask(req, res) {
  const { taskId } = req.params;
  const { userId } = req.params;
  console.log('taskId', taskId);
  console.log('useId', userId);
  console.log('req.body', req.body);
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
  addTask,
  updateTask,
  deleteTask,
};
