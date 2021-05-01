const { addUser } = require('./userController');

const userMock = require('../models/__mocks__/user');

jest.mock('../models/user', () => ({
  create: async () => {
    const asyncMock = jest.fn().mockRejectedValue(new Error('Async error'));
    await asyncMock();
  },
}));

describe('addUser fail', () => {
  it('should throw an error if creating the user was not possible', async () => {
    const mReq = {
      body: {
        ...userMock,
      },
    };
    const mRes = {
      status: jest.fn(),
    };

    await addUser(mReq, mRes);
    expect(mRes.status).toHaveBeenCalledWith(500);
  });
});
