// add mock req.params user id
// mock user.findby returns: {
// populate: jest.fn() -> { lists: "Hello" }
// }
// expect res.body -> Hello
const { getLists, addList } = require('./listController');
const list = require('../models/list');
const user = require('../models/user');

jest.mock('../models/list');
jest.mock('../models/user');

jest.mock('../models/user');
jest.mock('../models/list');

describe('listController', () => {
  let mReq;
  let mRes;
  let mockUser;
  const mockExecPopulate = jest.fn();
  beforeEach(() => {
    user.findById = jest.fn();
    user.findByIdAndUpdate = jest.fn();
    list.create = jest.fn();
    mReq = {
      params: { userId: 1 },
    };
    mRes = {
      status: jest.fn(),
      send: jest.fn(),
    };
    mockUser = {
      populate: () => ({
        execPopulate: mockExecPopulate,
      }),
    };
  });

  describe('getLists', () => {
    it('should get lists', async () => {
      mockExecPopulate.mockResolvedValue({ lists: 'Test' });
      user.findById.mockResolvedValue(mockUser);

      await getLists(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(200);
      expect(mRes.send).toHaveBeenCalledWith('Test');
    });

    it('should handle error thrown by model', async () => {
      const mockErr = new Error('Test👘🐼🐼');
      user.findById.mockRejectedValue(mockErr);

      await getLists(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(500);
      expect(mRes.send).toHaveBeenCalledWith({
        error: mockErr,
        message: 'Did not find lists for user',
      });
    });
  });

  describe('addList', () => {
    beforeEach(() => {
      mReq = {
        params: { userId: 1 },
        body: { title: 'Test Body' },
      };
    });

    it('should add a list', async () => {
      list.create.mockResolvedValue({ _id: 'uuid' });
      user.findById.mockResolvedValue({ lists: ['Test Item'] });
      mockExecPopulate.mockResolvedValue({ lists: 'Test' });
      user.findByIdAndUpdate.mockResolvedValue(mockUser);

      await addList(mReq, mRes);

      expect(mRes.status).toHaveBeenCalledWith(201);
      expect(mRes.send).toHaveBeenCalledWith('Test');
    });
  });
});
