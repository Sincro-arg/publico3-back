const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/salud', (req, res) => {
  res.json({ estado: 'ok' });
});

app.get('/saludo/:nombre', (req, res) => {
  const { nombre } = req.params;

  if (!nombre || nombre.trim().length === 0 || nombre.length > 40) {
    return res.status(400).json({ error: 'El nombre no puede estar vacio ni superar 40 caracteres' });
  }

  res.json({ mensaje: `Hola, ${nombre}!` });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
