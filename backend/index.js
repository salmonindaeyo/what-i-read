const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const corsOptions = {
  origin: "*", // กำหนด origin ที่ยอมรับ
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // กำหนดเมทอดที่ยอมรับ
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
let conn = null;
const secret = "testhelloworld";

const connectMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ntw171044.",
    database: "what_i_read",
    port: "3306",
  });
};
const port = 8000;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Forbidden" });
  }
};
app.listen(port, async () => {
  await connectMySQL();

  console.log(`Server is running on port ${port}`);
});

app.get("/testdb", async (req, res) => {
  try {
    let results = await conn.query("SELECT * FROM users");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/users", authenticateToken, async (req, res) => {
  try {
    let results = await conn.query("SELECT * FROM users");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let [results] = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Error fetching user" });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await conn.query(
    "SELECT * FROM users WHERE username = ?",
    username
  );
  if (rows.length) {
    return res.status(400).send({ message: "username is already registered" });
  }

  const hash = await bcrypt.hash(password, 10);
  const userData = { username, password: hash };

  try {
    const result = await conn.query("INSERT INTO users SET ?", userData);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "insert fail",
      error,
    });
  }

  res
    .status(201)
    .send({ status: 201, message: "User registered successfully" });
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [userResult] = await conn.query(
      "SELECT * from users WHERE username = ?",
      username
    );
    const user = userResult[0];

    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send({ message: `Invalid email or password ` });
    }
    const token = jwt.sign(
      { userId: user.user_id, username: user.username },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.send({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/users", authenticateToken, async (req, res) => {
  const data = req.body;

  try {
    const result = await conn.query("INSERT INTO users SET ?", data);
    const userId = result[0].insertId;
    res.status(201).json({ message: "User created successfully", userId });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const result = await conn.query("UPDATE users SET ? WHERE id = ?", [
      data,
      id,
    ]);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully", userId: id });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Error updating user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await conn.query("DELETE FROM users WHERE id = ?", [id]);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully", userId: id });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Error deleting user" });
  }
});

app.post("/api/addManga", authenticateToken, async (req, res) => {
  const { id, title, description, picture, url } = req.body;
  try {
    const [rows] = await conn.query(
      "SELECT * FROM books WHERE title = ? AND user_id = ?",
      [title, id]
    );
    if (rows.length) {
      return res
        .status(400)
        .send({ message: "This manga has already existed." });
    }

    const data = {
      user_id: id,
      title,
      description_book: description,
      picture_link: picture,
      url_link: url,
    };

    try {
      const result = await conn.query("INSERT INTO books SET ?", data);
      res.status(201).send({ status: 201, message: "add manga successfully" });
    } catch (error) {
      res.status(400).json({
        message: "insert fail",
        error,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/api/manga", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  try {
    let results = await conn.query("SELECT * FROM books WHERE user_id = ? ", [
      userId,
    ]);
    res.json({ status: 200, data: results[0] });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/api/manga/:id", authenticateToken, async (req, res) => {
  const bookId = req.params.id;
  const { userId } = req.user;

  try {
    let [results] = await conn.query(
      "SELECT * FROM books WHERE book_id = ? AND user_id = ?",
      [bookId, userId]
    );
    if (results.length === 0) {
      return res.status(404).json({ status: 404, error: "manga not found" });
    }
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching manga:", error.message);
    res.status(500).json({ error: "Error fetching manga" });
  }
});

app.delete("/api/manga/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const result = await conn.query("DELETE FROM books WHERE book_id = ?", [
      id,
    ]);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: "book not found" });
    }
    res.json({ message: "manga deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Error deleting user" });
  }
});
