const request = require ('supertest')
const app = require ('../../app')
const User = require('../../src/v1/models/users')
const Teacher = require('../../src/v1/models/teachers')


const userOne = {
  name: 'Maduka',
  email: 'maduka@madu.com',
  password: 'Thi2sismypass!!'
}

const teacherOne = {
  name: 'Naira',
  email: 'naira@marley.com',
  password: '2thisismyPass!!'
}


beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})


test('should signup a user', async () => {
  await request(app).post('/users').send({
    name:'userOne',
    email: 'userone@test.com',
    password: '!Membarne2',
  }).expect(201)
})

test ('should signup a teacher', async () => {
  await request(app).post('/teachers').send({
    name:'TeachOne',
    email: 'teachone@test.com',
    password: '!Membrane2',
  }).expect(201)
})


describe("Sample Test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});
