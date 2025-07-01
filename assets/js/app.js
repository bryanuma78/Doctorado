const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "login.html"));
});

// (opcional: si quieres asegurar otras rutas)
app.get("/pages/admision.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "admision.html"));
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
