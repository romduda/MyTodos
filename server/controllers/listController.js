const user = require('../models/user');
const list = require('../models/list');

async function getLists(req, res) {
  const { userId } = req.params;
  try {
    // TODO: should throw error if user does not exist, and not hang
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
    res.status(500);
    res.send({ error, message: 'Did not find lists for user' });
    console.error(error); // eslint-disable-line
  }
}

async function addList(req, res) {
  if (req.body.title === undefined) {
    res.status(400);
    res.send({ message: 'Invalid body' });
  } else {
    const { userId } = req.params;
    try {
      // Create new list, with default section
      const newList = await list.create({
        title: req.body.title,
        sections: [{ isDefaultSection: true }],
        userId,
      });
      const { lists } = await user.findById(userId);
      const updatedUser = await user.findByIdAndUpdate(userId, {
        lists: [newList._id, ...lists],
      },
      { new: true });
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
      res.status(400);
      res.send({ error, message: 'Could not add list' });
      console.error(error); // eslint-disable-line
    }
  }
}

async function updateListsOrder(req, res) {
  try {
    const { userId } = req.params;
    const updatedUser = await user.findByIdAndUpdate(userId, {
      lists: [...req.body.lists],
    },
    { new: true });
    res.status(200);
    res.send(updatedUser.lists);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could update lists order' });
    console.error(error); // eslint-disable-line
  }
}

async function deleteList(req, res) {
  const { listId } = req.params;
  const { userId } = req.params;
  try {
    await list.findByIdAndDelete(listId);
    // TODO: Get the tasks from the list remove references to the listId
    // from their list property, so that keep the database cleaner
    const updatedUser = await user.findByIdAndUpdate(userId,
      { $pull: { lists: listId } },
      { new: true });
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
    res.status(200).send(populatedUser.lists);
  } catch (error) {
    res.status(400);
    res.send({ error, message: 'Could not delete list' });
  }
}

module.exports = {
  getLists,
  addList,
  deleteList,
  updateListsOrder,
};
