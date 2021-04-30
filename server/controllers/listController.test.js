// add mock req.params user id
// mock user.findby returns: {
// populate: jest.fn() -> { lists: "Hello" }
// }
// expect res.body -> Hello
const {
  getLists,
} = require('./listController');

jest.mock('../models/user', () => ({
  findById: async () => ({
    populate: () => ({
      // eslint-disable-next-line no-console
      execPopulate: () => ({
        lists: 'Hi there',
      }),
    }),
  }),
}));
describe('getLists', () => {
  it('should return lists', async () => {
    const mReq = {
      params: {
        userId: 'a',
      },
    };
    const mRes = {
      status: jest.fn(),
      send: jest.fn(),
    };

    await getLists(mReq, mRes);

    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.send).toHaveBeenCalledWith('Hi there');
  });
});
