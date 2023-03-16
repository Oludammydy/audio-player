import express from "express";
import getDb from "../db";
import { User } from "../db/types";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
    const db = getDb();
    const users = db.collection<User>("user");

    const password = await bcrypt.hash(req.body.password, 10);

    await users.insertOne({
        email: req.body.email,
        password,
        username: req.body.username,
    });

    res.status(200).json({ message: "Registered successfully" });
});

export default router;