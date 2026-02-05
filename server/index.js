require('dotenv').config();
const express = require('express')
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(cors()
app.use(express.json()
const PORT = process.env.PORT || 
const HIRO_BASE = 'hs://tcksbockhain-api.ir.s
app.get('/tx/:txid', sync (re, res)
  try
    const { txid } = re
    const r = await axos.get(`$l{HIRO_BASE}/extended1/x${txid})
    res.jso
  } catch (e
    console.eror(err.toStrng));
    res.status500)json({ error: err.toString( });
 
})

app.get('/transactions-by-meo/:memo', async (rq, res) => {
  try 
    const memo = req.arams.memo;
    const r = await axios.get(`${HIRO_BSE}/extended/v/transactns?memo=${encodeURIComponnt(memo)}`);
    res.json(r.da);
  } catch (err) {
    console.error(err.toString());
    res.status(500).json({ error: err.toString() })
  }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))