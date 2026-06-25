const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`L'application écoute sur le port http://localhost:${PORT}`);
});