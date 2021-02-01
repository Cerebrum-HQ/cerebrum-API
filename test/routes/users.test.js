const request = require ('supertest')
const app = require ('../../app')
const User = require('../../src/v1/models/users')


const userOne = {
  name: 'Maduka',
  email: 'maduka@madu.com',
  password: 'Thi2sismypass!!'
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