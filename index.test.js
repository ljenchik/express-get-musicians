const request = require("supertest");
const app = require("./src/app");
const { Musician } = require("./models");
const { db } = require("./db/connection");
const { syncSeed } = require("./seed");

describe("Testing musicians endpoints", () => {
    beforeAll(async () => {
        await db.sync({ force: true });
        await syncSeed();
    });
    test("Testing GET /musicians endpoint", async () => {
        const response = await request(app).get("/musicians");
        //console.log(response.body);
        expect(response.body.length).toBe(3);
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        //console.log(data);
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Mick Jagger",
                    instrument: "Voice",
                }),
            ])
        );
        expect(data).toEqual(
            expect.arrayContaining([expect.objectContaining({ name: "Drake" })])
        );
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "Jimi Hendrix" }),
            ])
        );
    });

    test("Testing POST /musicians endpoint", async () => {
        const length = (await Musician.findAll()).length;
        const response = await request(app)
            .post("/musicians")
            .send({ name: "Bonny", instrument: "Triangle" });
        const musicians = JSON.parse(response.text);
        expect(musicians.length).toEqual(length + 1);
        expect(musicians).toEqual(
            expect.arrayContaining([expect.objectContaining({ name: "Bonny" })])
        );
    });

    test("Testing PUT /musicians/:id endpoint", async () => {
        await request(app)
            .put("/musicians/4")
            .send({ name: "Bill", instrument: "Saxophone" });
        const musicians = await Musician.findAll();
        expect(musicians).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Bill",
                    instrument: "Saxophone",
                }),
            ])
        );
        const found = await Musician.findOne({ where: { name: "Bill" } });
        expect(found.id).toBe(4);
    });

    test("Testing DELETE /musicians/:id endpoint", async () => {
        const length = (await Musician.findAll()).length;
        await request(app).delete(`/musicians/1`);
        const musiciansAfterDeleting = await Musician.findAll();
        expect(musiciansAfterDeleting.length).toBe(length - 1);
    });
});

describe("Testing bands endpoints", () => {
    beforeAll(async () => {
        await db.sync({ force: true });
        await syncSeed();
    });
    test("Testing all bands endpoint", async () => {
        const response = await request(app).get("/bands");
        expect(response.body.length).toBe(3);
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        //console.log(data);
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "The Beatles",
                }),
            ])
        );
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "Black Pink" }),
            ])
        );
        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "Coldplay" }),
            ])
        );
    });
});

describe("Testing /musicians/:id endpoint", () => {
    beforeAll(async () => {
        await db.sync({ force: true });
        await syncSeed();
    });
    test("Testing /musicians/2 endpoint", async () => {
        const response = await request(app).get("/musicians/2");
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data).toEqual(
            expect.objectContaining({
                name: "Drake",
                instrument: "Voice",
            })
        );
    });

    test("Testing /musicians/1 endpoint", async () => {
        const response = await request(app).get("/musicians/1");
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data).toEqual(
            expect.objectContaining({
                name: "Mick Jagger",
                instrument: "Voice",
            })
        );
    });

    test("Testing /musicians/3 endpoint", async () => {
        const response = await request(app).get("/musicians/3");
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data).toEqual(
            expect.objectContaining({
                name: "Jimi Hendrix",
                instrument: "Guitar",
            })
        );
    });
});

describe("Tests router fot /musicians", () => {
    beforeAll(async () => {
        await db.sync({ force: true });
        await syncSeed();
    });
    test("tests GET /musicians", async () => {
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch("application/json");
        expect(Array.isArray(response.body)).toBe(true);
        expect(
            response.body.every(
                ({ name, instrument }) => !!name && !!instrument
            )
        ).toBe(true);
    });

    test("tests GET /musicians/:id", async () => {
        const id = 3;
        const response = await request(app).get(`/musicians/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch("application/json");
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 3,
                name: "Jimi Hendrix",
                instrument: "Guitar",
            })
        );
    });

    test("tests POST /musicians", async () => {
        const response = await request(app)
            .post(`/musicians`)
            .send({ name: "Bonny", instrument: "Guitar" });
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch("application/json");
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toContainEqual(
            expect.objectContaining({
                name: "Bonny",
                instrument: "Guitar",
            })
        );
        expect(
            response.body.every(
                ({ name, instrument }) => !!name && !!instrument
            )
        ).toBe(true);
    });

    test("tests PUT /musicians", async () => {
        const id = 3;
        const response = await request(app)
            .put(`/musicians/${id}`)
            .send({ name: "Alex", instrument: "Drums" });
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch("application/json");
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toContainEqual(
            expect.objectContaining({
                id: 3,
                name: "Alex",
                instrument: "Drums",
            })
        );
        expect(
            response.body.every(
                ({ name, instrument }) => !!name && !!instrument
            )
        ).toBe(true);
    });

    test("tests DELETE /musicians", async () => {
        const id = 3;
        const length = (await Musician.findAll()).length;
        const response = await request(app).delete(`/musicians/${id}`);
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch("application/json");
        expect(Array.isArray(response.body)).toBe(true);
        expect(
            response.body.every(
                ({ name, instrument }) => !!name && !!instrument
            )
        ).toBe(true);
        const musiciansAfterDeleting = await Musician.findAll();
        expect(musiciansAfterDeleting.length).toBe(length - 1);
    });
});
