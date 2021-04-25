const user = require('../models/user');

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
      const { lists } = await user.findById(userId);
      const updatedUser = await user.findByIdAndUpdate(userId, {
        lists: [{
          title: req.body.title,
          sections: [{ isDefaultSection: true }],
        }, ...lists],
      },
      { new: true });

      res.status(201);
      res.send(updatedUser.lists);
    } catch (error) {
      res.status(400);
      res.send({ error, message: 'Could not add list' });
      console.error(error); // eslint-disable-line
    }
  }
}

async function deleteList(req, res) {
  const { listId } = req.params;
  const { userId } = req.params;
  try {
    const currUser = await user.findById(userId);
    const list = await currUser.lists.id(listId);
    await list.remove();
    const updatedUser = await currUser.save();

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400);
    res.send({ error, message: 'Could not delete list' });
  }
}

module.exports = {
  getLists,
  addList,
  deleteList,
};
