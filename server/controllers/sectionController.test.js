/**
 * @jest-environment node
 */
const { addSection } = require('./sectionController');
const list = require('../models/list');
const user = require('../models/user');

jest.mock('../models/list');
jest.mock('../models/user');

// Setup
beforeEach(() => {
  user.findById = jest.fn();
  list.findByIdAndUpdate = jest.fn();
});

// Global mock data
const mockExecPopulate = jest.fn();

describe.only('addSection', () => {
  let mReq;
  let mRes;
  describe('add section succeed', () => {
    beforeEach(() => {
      mReq = {
        params: {
          userId: 1,
          listId: 2,
        },
        body: { title: 'test title' },
      };
      mRes = {
        status: jest.fn(),
        send: jest.fn(),
      };
    });

    it('should add section', async () => {
      mockExecPopulate.mockResolvedValue({ lists: 'Test' });
      user.findById.mockResolvedValue({
        populate: () => ({
          execPopulate: mockExecPopulate,
        }),
      });
      await addSection(mReq, mRes);

      expect(mRes.status).toBeCalledWith(201);
      expect(mRes.send).toBeCalledWith('Test');
    });

    it('should handle user model throwing', async () => {
      const mockErr = new Error('Test👘🐼🐼');
      user.findById.mockRejectedValue(mockErr);

      await addSection(mReq, mRes);

      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.send).toBeCalledWith({
        error: mockErr,
        message: 'Could not add section',
      });
    });
  });
});
