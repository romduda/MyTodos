/**
 * @jest-environment node
 */
const { addSection, updateSection } = require('./sectionController');
const list = require('../models/list');
const user = require('../models/user');

jest.mock('../models/list');
jest.mock('../models/user');

// Setup
beforeEach(() => {
  user.findById = jest.fn();
  list.findByIdAndUpdate = jest.fn();
  list.findById = jest.fn();
});

// Global mock data
const mockExecPopulate = jest.fn();
let mReq;
let mRes;

describe.only('sectionController', () => {
  describe('addSection', () => {
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
    it('should handle list model throwing', async () => {
      const mockErr = new Error('Test👘🐼🐼');
      list.findByIdAndUpdate.mockRejectedValue(mockErr);

      await addSection(mReq, mRes);

      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.send).toBeCalledWith({
        error: mockErr,
        message: 'Could not add section',
      });
    });
    it('should handle execPopulate throwing', async () => {
      const mockErr = new Error('Test👘🐼🐼');
      user.findById.mockResolvedValue({
        populate: () => ({
          execPopulate: mockExecPopulate.mockRejectedValue(mockErr),
        }),
      });

      await addSection(mReq, mRes);

      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.send).toBeCalledWith({
        error: mockErr,
        message: 'Could not add section',
      });
    });
  });
  describe('updateSection', () => {
    beforeEach(() => {
      mReq = {
        params: {
          userId: 1,
          listId: 2,
          sectionId: 3,
        },
        body: { title: 'test title' },
      };
      mRes = {
        status: jest.fn(),
        send: jest.fn(),
      };
    });
    it('should update a section', async () => {
      const mockResEnd = jest.fn();
      mRes.status = jest.fn().mockReturnValue({ end: mockResEnd });
      await updateSection(mReq, mRes);

      expect(mRes.status).toBeCalledWith(200);
      expect(mockResEnd).toHaveBeenCalled();
    });
  });
});
