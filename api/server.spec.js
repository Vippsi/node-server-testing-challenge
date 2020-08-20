const supertest = require("supertest")
const server = require('./server')
const db = require("../data/dbConfig")


describe("server", () => {
    beforeEach(async () => {
        await db('users').truncate()
    })

    describe("GET /", () => {
    
        it("Should return 200 OK", () => {
            return supertest(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })

        it("Should return server: is running", () => {
            return supertest(server).get("/").expect({server: "is running"})
        })

    })


    describe("GET /users", () => {
        it("Should return 200 OK", () => {
            return supertest(server).get("/users").then(res => {
                expect(res.status).toBe(200)
            })
        })

        it("Should return JSON", () => {
            return supertest(server).get("/users")
            .then(res => {
                expect(res.type).toMatch(/json/)
            })
        })
    })

    describe("POST /users", () => {
        it("Should return 201", () => {
            return supertest(server).post("/users").send({name: "Test name"}).then(res => {
                expect(res.status).toBe(201)
            })
        })

        it("Should add users to db", async () => {
            await supertest(server).post("/users").send({name: 'test'})

            const users = await db("users")

            expect(users).toHaveLength(1)
        })
    })

    describe("DELETE /users", () => {
        it("Should return 200 OK", () => {
            const userId = 1
            return supertest(server).delete("/users/" + userId).then(res => {
                expect(res.status).toBe(200)
            })
        })

        it("Should delete a user from the DB", async () => {
            await db("users").insert({name: "test name"})
            await db("users").insert({name: "test name2"})

            const userId = 1
            await supertest(server).delete("/users/" + userId)
            const users = await db("users")
            expect(users).toHaveLength(1)
        })
    })
})