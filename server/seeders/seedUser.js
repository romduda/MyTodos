const user = require('../models/user');
const sampleUser = require('./sampleUser');

async function seedUser() {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = sampleUser;
    const newUser = await user.create({
      firstName,
      lastName,
      email,
      password,
    });
    console.log({ message: 'Successfully created new user', _id: newUser._id });
  } catch (error) {
    console.error({ message: 'There was an error creating a sample user', error });
  }
}

seedUser();
