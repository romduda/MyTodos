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

const task = require('../models/task');
const list = require('../models/list');
const user = require('../models/user');
const mockExecPopulate = jest.fn();

// jest.mock('../models/task');

// Setup
beforeEach(() => {
  user.create = jest.fn();
  user.findById = jest.fn();
  user.populate = jest.fn();
  list.findByIdAndUpdate = jest.fn();
  list.findById = jest.fn();
  list.save = jest.fn();
  list.sections.id = jest.fn();
  task.create = jest.fn();
  task.findByIdAndUpdate = jest.fn();
});

// jest.mock('../models/task', () => ({
//   create: async () => ({
//     _id: 123,
//     title: 'mock create: new task',
//     user: '507f1f77bcf86cd799439011',
//     list: ['507f1f77bcf86cd799439012'],
//   }),
//   findByIdAndUpdate: async () => console.log('database: find one and update - task'),
// }));

// jest.mock('../models/list', () => ({
//   findById: async () => ({
//     sections: {
//       id: async () => ({
//         title: 'new section',
//         isDefaultSection: false,
//         tasks: ['507f1f77bcf86cd799439014'],
//       }),
//       remove: console.log('list: remove task'),
//     },
//     save: async () => console.log('database: save - list'),
//   }),
//   sections: {
//     id: async () => ({
//       title: 'new section',
//       isDefaultSection: false,
//       tasks: ['507f1f77bcf86cd799439014'],
//     }),
//   },
// }));

// jest.mock('../models/user', () => ({
//   findById: async () => ({
//     populate: () => ({
//       // eslint-disable-next-line no-console
//       execPopulate: async () => ({
//         lists: 'some lists',
//       }),
//     }),
//     lists: {
//       id: async () => ({
//         title: 'list to delete',
//         color: 'default',
//         sections: {
//           data: [],
//           id: async () => ({
//             remove: async () => {
//               console.log('user: remove section');
//             },
//           }),
//         },
//         userId: '507f1f77bcf86cd799439011',
//       }),
//     },
//     save: async () => console.log('database: save - user'),
//   }),
// }));

describe('addNewTask', () => {
  it('should add a new task and return user lists', async () => {
    task.create.mockResolvedValue({
      _id: 123,
      title: 'mock create: new task',
      user: '507f1f77bcf86cd799439011',
      list: ['507f1f77bcf86cd799439012'],
    });
    task.findByIdAndUpdate.mockResolvedValue(console.log('database: find one and update - task'));

    mockExecPopulate.mockResolvedValue({ lists: 'some lists' });
    user.findById.mockResolvedValue({
      populate: () => ({
        execPopulate: mockExecPopulate,
      }),
    });
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

// describe('addExistingTask', () => {
//   it('should throw error code 400 if taskId is not provided', async () => {
//     const mReq = {
//       body: {
//         taskId: undefined,
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

//     await addExistingTask(mReq, mRes);

//     expect(mRes.status).toHaveBeenCalledWith(400);
//     expect(mRes.send).toHaveBeenCalledWith({ message: 'Body did not include "taskId" property' });
//   });
//   it('should add a new task by updating the lists and sections and return user lists', async () => {
//     const mReq = {
//       body: {
//         taskId: '507f1f77bcf86cd799439014',
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

//     await addExistingTask(mReq, mRes);

//     expect(mRes.status).toHaveBeenCalledWith(201);
//     expect(mRes.send).toHaveBeenCalledWith('some lists');
//   });
// });
// describe('updateTask', () => {
//   it('should update a task and return user lists', async () => {
//     const mReq = {
//       body: {
//         task: {
//           title: 'updated title',
//           user: '507f1f77bcf86cd799439011',
//           lists: ['507f1f77bcf86cd799439012'],
//         },
//       },
//       params: {
//         userId: '507f1f77bcf86cd799439011',
//         taskId: '507f1f77bcf86cd799439012',
//       },
//     };
//     const mRes = {
//       status: jest.fn(),
//       send: jest.fn(),
//     };

//     await updateTask(mReq, mRes);

//     expect(mRes.status).toHaveBeenCalledWith(200);
//     expect(mRes.send).toHaveBeenCalledWith('some lists');
//   });
//   it('should throw an error code 400 if updating a task, finding a user or populating the data fail', async () => {
//     const mReq = {
//       body: {
//         task: {
//           title: 'updated title',
//           user: '507f1f77bcf86cd799439011',
//           lists: ['507f1f77bcf86cd799439012'],
//         },
//       },
//       params: {
//         userId: undefined,
//         taskId: '507f1f77bcf86cd799439012',
//       },
//     };
//     const mRes = {
//       status: jest.fn(),
//       send: jest.fn(),
//     };

//     await updateTask(mReq, mRes);

//     expect(mRes.status).toHaveBeenCalledWith(400);
//     expect(mRes.send).toHaveBeenCalledWith({ message: 'Could not update task' });
//   });
// });
// describe('deleteTask', () => {
//   it('should delete a task, remove the section and return the updated user', async () => {
//     const mReq = {
//       params: {
//         userId: '507f1f77bcf86cd799439010',
//         listId: '507f1f77bcf86cd799439011',
//         sectionId: '507f1f77bcf86cd799439012',
//       },
//     };
//     const mRes = {
//       status: jest.fn(),
//       send: jest.fn(),
//     };

//     await deleteTask(mReq, mRes);

//     expect(mRes.status).toHaveBeenCalledWith(201);
//     expect(mRes.send).toHaveBeenCalledWith(console.log('database: save'));
//   });
//   it('should throw error code 400 if processing is not possible', async () => {
//     const mReq = {
//       params: {
//         userId: '507f1f77bcf86cd799439010',
//         listId: '507f1f77bcf86cd799439011',
//         sectionId: '507f1f77bcf86cd799439012',
//       },
//     };
//     const mRes = {
//       status: jest.fn(),
//       send: jest.fn(),
//     };

//     await deleteTask(mReq, mRes);

//     expect(mRes.status).toHaveBeenCalledWith(400);
//     expect(mRes.send).toHaveBeenCalledWith({ message: 'Could not delete section' });
//   });
// });