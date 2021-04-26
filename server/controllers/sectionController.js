const user = require('../models/user');

async function addSection(req, res) {
  const { userId } = req.params;
  const { listId } = req.params;
  try {
    const currUser = await user.findById(userId);
    const list = await currUser.lists.id(listId);
    list.sections = [...list.sections, { title: req.body.title }];
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
    res.send({ error, message: 'Could not add section' });
    console.error(error); // eslint-disable-line
  }
}

async function updateSection(req, res) {
  res.status(200).end();
}

async function deleteSection(req, res) {
  const { userId } = req.params;
  const { listId } = req.params;
  const { sectionId } = req.params;
  try {
    const currUser = await user.findById(userId);
    const list = await currUser.lists.id(listId);
    const section = await list.sections.id(sectionId);
    await section.remove();
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
    res.status(200).send(populatedUser.lists);
  } catch (error) {
    res.status(400);
    res.send({ error: JSON.stringify(error), message: 'Could not delete section' });
    console.error(error); // eslint-disable-line
  }
}

module.exports = {
  addSection,
  updateSection,
  deleteSection,
};
