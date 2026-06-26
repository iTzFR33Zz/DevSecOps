const express = require('express');
const path = require('path');
const { exec } = require('child_process'); // Utilisé pour introduire une faille SAST

const SIMULATED_AWS_KEY = process.env.SIMULATED_AWS_KEY || "dummy_aws_key";
const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN || "dummy_internal_token";
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

app.get('/api/debug-ping', (req, res) => {
  const targetIp = req.query.ip || '127.0.0.1';

  exec(`ping -c 1 ${targetIp}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ output: stdout });
  });
});

app.get('/api/welcome', (req, res) => {
  const name = req.query.name || 'Invité';
  res.send(`<h1>Bienvenue ${name}</h1>`);
});

module.exports = app;