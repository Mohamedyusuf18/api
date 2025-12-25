const { Client } = require("pg");
const express = require("express");

const app = express();
app.use(express.json());

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "12345678",
  database: "yusufDB",
});

// CONNECT TO DATABASE
con.connect()
  .then(() => console.log("Database connected"))
  .catch(err => console.error(err));

// GET ALL USERS
app.get("/users", async (req, res) => {
  try {
    const result = await con.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// CREATE USER
app.post("/user", async (req, res) => {
  try {
    const { username, email, firstname, lastname } = req.body;

    const result = await con.query(
      `INSERT INTO users (username, email, first_name, last_name)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, firstname, lastname]
    );

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
