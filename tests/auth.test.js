import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import Client from "../models/client.js";

import dotenv from "dotenv";
dotenv.config();

beforeEach(async () => {
	await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
	await mongoose.connection.close();
});

describe("POST /api/login", () => {
	it("should return Champs manquants", async () => {
		const response = await request(app).post("/api/login").send({
			abx: "adf",
		});

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: "Champs manquants" });
	});

	it("should return Adresse email ou mot de passe incorrect", async () => {
		const response = await request(app).post("/api/login").send({
			email: "lol@lol.com",
			mdp: "poop",
		});

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: "Adresse email ou mot de passe incorrect" });
	});
});

describe("POST /api/signup", () => {
	it("should return Champs manquants", async () => {
		const response = await request(app).post("/api/signup").send({
			abx: "adf",
		});

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: "Champs manquants" });
	});

	it("should return Adresse email est invalide", async () => {
		const response = await request(app).post("/api/signup").send({
			prenom: "lol",
			nom: "lol",
			email: "lol",
			mdp: "lol",
		});

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: "Adresse email est invalide" });
	});

	it("should return Mot de passe trop court (8 caracteres min)", async () => {
		const response = await request(app).post("/api/signup").send({
			prenom: "lol",
			nom: "lol",
			email: "loL@gmail.com",
			mdp: "lol",
		});

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: "Mot de passe trop court (8 caracteres min)" });
	});

	it("should successfully create an account", async () => {
		await Client.deleteOne({ email: "bernard@gmail.com" });

		const response = await request(app).post("/api/signup").send({
			prenom: "lol",
			nom: "lol",
			email: "bernard@gmail.com",
			mdp: "lolololol",
		});

		expect(response.body).toEqual({ message: "Votre compte a été créé avec succès" });
		expect(response.status).toBe(200);

		const client = await Client.findOne({ email: "bernard@gmail.com" });

		expect(client).toBeTruthy();
	});

	it("should return Adresse email est déjà utilisée", async () => {
		await Client.create({
			prenom: "lol",
			nom: "lol",
			email: "nadirleboss@gmail.com",
			mdpHash: "lolololol",
		});

		const response = await request(app).post("/api/signup").send({
			prenom: "lol",
			nom: "lol",
			email: "nadirleboss@gmail.com",
			mdp: "lolololol",
		});

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: "Adresse email est déjà utilisée" });
	});
});
