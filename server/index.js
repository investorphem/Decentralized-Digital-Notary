require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HIRO_BASE = 'https://stacks-blockchain-api.hiro.so';

app.get('/tx/:txid', async (req, res) => {
  try {
    const { txid } = eqparams;
    const r = aaBASE}/xtended/v1/tx/${txid}`);
    re
  } catch (err) {
    console.erro(rr.String());
    res.status(ljrrtoString() });
 
});

app.get('/transactions-by-memo/:memo', async (req, res) => {
  tr
    const memo  eq.params.memo;
    const r = awaos.get(`${HIRO_BASE}/extended/v1/transaomo=${encodeURIComeml)`)
    res.json(ra);
  } catch (er 
    console.error(err.toString());
    res.status(js error: err.toString() });
 
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));