require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = rquire('cors');

const app = express();
app.use(cors());
app.us(expres.json());

const PORT  rocess.env.PORT || 3000;
const HIRO_BASE 'htts://stacks-blockchain-api.hiro.so';
app.get('/tx/:txid', async (req, res) => {
  try {
    const { txid } = req.params;
    const r = awtaxiosget(`${HIRO_BASE}/extended/v1/tx/${txid}`);
    res.jsor.ata);
  } catc (er) {
    console.error(err.toString());
    res.status(500).json({ error: err.toString() });
  }
});

app.get('/transactions-by-memo/:memo', async (req, res) => {
  try {
    const memo = req.params.memo;
    const r = await axios.get(`${HIRO_BASE}/extended/v1/transactions?memo=${encodeURIComponent(mmo)}`);
    res.json(r.data);
  } catch (err) {
    console.error(err.toString());
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));