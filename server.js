const express = require("express");
const mysql = require("mysql");
const http = require("http");

const bodyParser = require("body-parser");
const { error } = require("console");

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//coexion
const connection = mysql.createConnection({
  host: "216.238.107.175",
  user: "itasatc1_jabedala",
  password: "HOLACAP1234",
  database: "itasatc1_juanpablo",
});

// rutas
app.get("/", (req, res) => {
  res.send("Bienviendo a la api");
});

app.get("/Listusers", (req, res) => {
  const sql = "SELECT * from personas";
  connection.query(sql, (error, resultado) => {
    if (error) {
      console.log(error.message);
    }

    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.send("No hay usuarios");
    }
  });
});

app.get("/usersLogon/:ci/:pass", (req, res) => {
  const { ci, pass } = req.params;
  const sql = "SELECT * FROM personas WHERE ci = ? AND contraseña = ?";
  connection.query(sql, [ci, pass], (error, resultado) => {
    if (error) throw error;
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.send("cheque el usuario y contraseña");
    }
  });
});

app.get("/listLongLat/:mac", (req, res) => {
  res.send("List longitude , latitude dispositives");
});

// chequeo conexion
connection.connect((error) => {
  if (error) throw error;
  console.log("Database connect and run");
});
const server = http.createServer(app);
server
  .listen(PORT)
  .on("listen", () => {
    console.log("Servidor corriendo en puerto:" + PORT);
  })
  .on("error", (error) => {
    console.log(error);
    process.exit(1);
  });
