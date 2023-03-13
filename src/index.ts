import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { connectToServer } from "./db";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use((err: Error, req: Request, res: Response) => {
    res.status(500).json({ message: err.message });
});

connectToServer().then(async () => {
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
});