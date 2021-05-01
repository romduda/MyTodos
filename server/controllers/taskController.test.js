const {
  addNewTask,
  addExistingTask,
  updateTask,
  deleteTask,

} = require('./taskController');

// jest.mock('../models/task', () => ({
//   create: async () => {
//     const asyncMock = jest.fn().mockRejectedValue(new Error('Async error'));
//     await asyncMock();
//   },
// }));

jest.mock('../models/task', () => ({
  create: async () => ({
    _id: 123,
    title: 'mock create: new task',
    user: '507f1f77bcf86cd799439011',
    list: ['507f1f77bcf86cd799439012'],
  }),
}));

jest.mock('../models/list', () => ({
  findById: async () => ({
    sections: {
      // arr: [],
      id: async () => ({
        title: 'new section',
        isDefaultSection: false,
        tasks: ['507f1f77bcf86cd799439014'],
      }),
    },
    save: async () => console.log('save'),
  }),
}));

jest.mock('../models/user', () => ({
  findById: async () => ({
    populate: () => ({
      // eslint-disable-next-line no-console
      execPopulate: async () => ({
        lists: 'some lists',
      }),
    }),
  }),
}));

describe('addNewTask', () => {
  it('should add a new task and return user lists', async () => {
    const mReq = {
      body: {
        title: 'request: new task',
      },
      params: {
        userId: '507f1f77bcf86cd799439011',
        listId: '507f1f77bcf86cd799439012',
        sectionId: '507f1f77bcf86cd799439013',
      },
    };
    const mRes = {
      status: jest.fn(),
      send: jest.fn(),
    };

    await addNewTask(mReq, mRes);

    expect(mRes.status).toHaveBeenCalledWith(201);
    expect(mRes.send).toHaveBeenCalledWith('some lists');
  });
});

// describe('addnewTask fail', () => {
//   it('should throw an error if creating a task and processing is error prone', async () => {
//     const mReq = {
//       body: {
//         title: 'request: new task',
//       },
//       params: {
//         userId: '507f1f77bcf86cd799439011',
//         listId: '507f1f77bcf86cd799439012',
//         sectionId: '507f1f77bcf86cd799439013',
//       },
//     };
//     const mRes = {
//       status: jest.fn(),
//       send: jest.fn(),
//     };

//     await addNewTask(mReq, mRes);

//     expect(mRes.status).toHaveBeenCalledWith(500);
//     expect(mRes.send).toHaveBeenCalledWith({ message: 'Could not add task' });
//   });
// });

// describe('addExistingTask', () => {
//   it('should add a new task by updating the lists and sections and return user lists', async () => {
//   });
// });
// describe('updateTask', () => {
//   it('should update a task and return user lists', async () => {
//   });
// });
// describe('deleteTask', () => {
//   it('should delete a task, remove the section and return the updated user', async () => {
//   });
// });