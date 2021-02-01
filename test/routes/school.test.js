const request = require ('supertest')
const app = require ('../../app')
const School = require('../../src/v1/models/schools')
const { teacherOne, schoolId, setupdb} = require('../db/db')

beforeEach(setupdb)

test('Should create a school', async () => {
    await request(app).post('/school/create-school')
        .set('Authorization', `Bearer ${teacherOne.tokens[0].token}`)
        .send({
            name: "school one",
            course: "school one course",
            description: "We do it well"
        }).expect(201)
})

test ('should update valid fields', async () => {
    await request(app).patch(`/school/${schoolId}`)
        .set('Authorization', `Bearer ${teacherOne.tokens[0].token}`)
        .send({
            name: "songs"
        }).expect(200)

    const school = await School.findById(schoolId)
    expect(school.name).toBe('songs')
})

test('should delete school', async() => {
    await request(app).delete(`/school/${schoolId}`)
        .set('Authorization', `Bearer ${teacherOne.tokens[0].token}`)
        .send()
        .expect(200)

    const school = await School.findById(schoolId)
    expect(school).toBeNull()
})