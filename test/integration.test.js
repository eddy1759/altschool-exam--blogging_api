const mongoose = require('mongoose')
const supertest = require('supertest')
const server = require('../server')
const CONFIG = require('./config/config');



beforeEach( async ()=>{
    await mongoose.connect(CONFIG.MONGODB_URL)
})

afterAll(()=>{
    mongoose.connection.close()
})



describe ('GET/blog', ()=>{
    it ('should return the homepage showing a list of blogs', async ()=>{
        
        const response = await supertest(server).get('/blog')
        expect(response.status).toBe(200)
        expect(response.body.status).toBe('success')
        
    })
})
    
describe('User Route', ()=>{
    it ('it should register a new user', async ()=>{
        const newUser = {
            email: "test@gmail.com",
            first_name: "john",
            last_name: "Doe",
            password: "password1"
        }
        const response = await supertest(server).post('/register').send(newUser)
        .expect(response.status).toBe(201)
    })
})


describe("GET /blog without token", () => {
    it("should return an error text", async () => {
        const response = await supertest(server).get("/blog");
        expect(response.text).toBe('invalid token, provide correct token');

    });
});

