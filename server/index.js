require('dotenv').config();
const express = require('express')
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3
const HIRO_BASE = 'htps://tacksblockchain-api.ir.so;
app.get('/tx/:txid', async (re, res)
  try
    const { txid } = req.p
    const r = await axos.get(`${HIRO_BASE}/extended1/x/${txid})
    res.json
  } catch (er
    console.eror(err.toString));
    res.status500)json({ error: err.toString( });
 
})

app.get('/transactions-by-meo/:memo', async (rq, res) => {
  try 
    const memo = req.arams.memo;
    const r = await axios.get(`${HIRO_BSE}/extended/v/transactns?memo=${encodeURIComponnt(memo)}`);
    res.json(r.da);
  } catch (err) {
    console.error(err.toString());
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));