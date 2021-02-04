const request = require ('supertest')
const app = require ('../../app')
const Teacher = require('../../src/v1/models/teachers')
const { userId, teacherOne, setupdb} = require('../db/db')


beforeEach(setupdb)


test ('should signup a teacher', async () => {
  await request(app).post('/teachers').send({
    name:'TeachOne',
    email: 'teachone@test.com',
    password: '!Membrane2',
  }).expect(201)
})

test ('login existing teacher && with new token', async () => {
  const res = await request(app).post('/teachers/login').send({
    email: teacherOne.email,
    password: teacherOne.password
  }).expect(200)

  const teacher = await Teacher.findById(userId)
  expect(res.body.token).toBe(teacher.tokens[1].token)

})


test('should not get profile of unauthenticated ', async () => {
  await request(app)
    .get('/teachers/me')
    .send()
    .expect(401)
})

test('delete teacher profile', async() => {
  await request(app).delete('/teachers/me')
    .set('Authorization', `Bearer ${teacherOne.tokens[0].token}`)
    .send()
    .expect(200)

  const teacher = await Teacher.findById(userId)
  expect(teacher).toBeNull()
})

test ('should update valid fields', async () => {
  await request(app).patch('/teachers/me')
    .set('Authorization', `Bearer ${teacherOne.tokens[0].token}`)
    .send({
      name: 'dollar'
    })
    .expect(200)
  
  const teacher = await Teacher.findById(userId)
  expect(teacher.name).toBe('dollar')
    
})

test ('should not update invalid fields', async () => {
  await request(app).patch('/teachers/me')
    .set('Authorization', `Bearer ${teacherOne.tokens[0].token}`)
    .send({
      location: 'nigeria'
    })
    .expect(400)
    
})