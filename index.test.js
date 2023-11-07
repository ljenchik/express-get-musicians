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
        await Musician.create({
            name: "Bonny",
            instrument: "Drums",
        });
        const musicians = await Musician.findAll();
        expect(musicians.length).toEqual(length + 1);
        expect(musicians).toEqual(
            expect.arrayContaining([expect.objectContaining({ name: "Bonny" })])
        );
    });

    test("Testing PUT /musicians/:id endpoint", async () => {
        //const response = await request(app).put("/musicians/6");
        const id = 4;
        const foundMusician = await Musician.findByPk(id);
        foundMusician.update({
            name: "Bill",
            instrument: "Guitar",
        });
        const musicians = await Musician.findAll();
        expect(musicians).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "Bill", instrument: "Guitar" }),
            ])
        );
        const found = await Musician.findOne({ where: { name: "Bill" } });
        expect(found.id).toBe(id);
    });

    test("Testing DELETE /musicians/:id endpoint", async () => {
        const id = 4;
        const foundMusician = await Musician.findByPk(id);
        const allMusicians = await Musician.findAll();
        const length = allMusicians.length;
        foundMusician.destroy();
        const musicians = await Musician.findAll();
        expect(musicians.length).toBe(length - 1);
    });
});

describe("Testing bands endpoints", () => {
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
