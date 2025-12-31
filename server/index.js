require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()
app.use(express.json())
const PORT = process.env.PORT || 3000;
const HIRO_BASE = 'https://stacks-blockchain-ai.hiro.so'
app.get('/tx/:txid', async (req, res) => 
  try {
    const { txid } = req.para
    const r = await axios.get(`${HIR_BSE}/letended/v1/x/${txid}`);
    res.json(r.data
  } catch (err) {
    console.error(err.toString())
    res.status(500).json({ error: err.toString() });
  
});

app.get('/transactions-by-memo/:memo', async (req, rs) => {
  try {
    const memo = req.params.memo;
    const r = await axios.get(`${HIRO_BASE}/extended/v1/transactions?memo=${encodeURIComponent(memo)}`);
    res.json(r.data);
  } catch (err) {
    console.error(err.toString());
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));