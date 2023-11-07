const request = require("supertest");
const app = require("./src/app");

describe("Testing musicians endpoints", () => {
    test("Testing musicians endpoint", async () => {
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

    // test("Testing musicians/1 endpoint", async () => {
    //     const response = await request(app).get("/musicians/1");
    //     expect(response.statusCode).toBe(200);
    //     const data = JSON.parse(response.text);
    //     expect(data).toEqual(
    //         expect.objectContaining({
    //             name: "Mick Jagger",
    //             instrument: "Voice",
    //         })
    //     );
    // });
    // test("Testing musicians/2 endpoint", async () => {
    //     const response = await request(app).get("/musicians/2");
    //     expect(response.statusCode).toBe(200);
    //     const data = JSON.parse(response.text);
    //     expect(data).toEqual(
    //         expect.objectContaining({
    //             name: "Drake",
    //             instrument: "Voice",
    //         })
    //     );
    // });

    // test("Testing musicians/3 endpoint", async () => {
    //     const response = await request(app).get("/musicians/3");
    //     expect(response.statusCode).toBe(200);
    //     const data = JSON.parse(response.text);
    //     expect(data).toEqual(
    //         expect.objectContaining({
    //             name: "Jimi Hendrix",
    //             instrument: "Guitar",
    //         })
    //     );
    // });
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
