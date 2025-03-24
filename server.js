require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Route pour géolocaliser une IP
app.get('/geolocate/ip/:ip', async (req, res) => {
    try {
        const ip = req.params.ip;
        const { data } = await axios.get(`${process.env.IP_API_URL}${ip}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur API IP' });
    }
});

// Route pour géolocaliser un numéro
app.get('/geolocate/phone/:number', async (req, res) => {
    try {
        const number = req.params.number;
        const { data } = await axios.get(`http://apilayer.net/api/validate?access_key=${process.env.NUM_VERIFY_API_KEY}&number=${number}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur API Numéro' });
    }
});

// Lancer le serveur
app.listen(process.env.PORT, () => {
    console.log(`Serveur lancé sur le port ${process.env.PORT}`);
});
