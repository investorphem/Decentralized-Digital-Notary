import React, { useState } from 'react'
import { sha256 } from 'js-sha256'

export default function VerifyPage() {
  const [file, setFile] = useState(null)
  const [hash, setHash] = useState('')
  const [verifyResult, setVerifyResult] = useState(null)
  const [status, setStatus] = useState('')

  async function handleFile(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    const arrayBuffer = await f.arrayBuffer()
    const digest = sha256(new Uint8Array(arrayBuffer))
    setHash(digest)
  }

  async function verify() {
    if (!hash) return alert('Select a file first')
    setStatus('Searching on-chain and via explorer...')
    setVerifyResult(null)

    try {
      // 1) Query the contract read-only map (via Stacks API) to see if the hash exists in the contract.
      // Replace CONTRACT_ADDRESS and CONTRACT_NAME as needed.
      const CONTRACT_ADDRESS = 'SP3FBR2AGK2Y3PT1ZQW9...'; // replace with deployed contract address
      const CONTRACT_NAME = 'notary'

      // Read-only call via Hiro API to get the map entry
      const url = `https://stacks-blockchain-api.hiro.so/extended/v1/contracts/call-read/${CONTRACT_ADDRESS}/${CONTRACT_NAME}`;
      const body = {
        "sender": CONTRACT_ADDRESS,
        "function_name": "get-notarization",
        "arguments": [
          {
            "repr": `(buff ${hash.length/2} ${hash})`,
            "hex": hash
          }
        ]
      }
      // The extended read-call endpoint expects a signed request normally, but simple map reads can be done via /v2/contracts/call-read?
      // Simpler: use the map-get API below (stack-blockchain-api map-get)
      const mapGetUrl = `https://stacks-blockchain-api.hiro.so/extended/v1/map/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/notarizations/${hash}`
      const res = await fetch(mapGetUrl)
      if (res.status === 200) {
        const json = await res.json()
        // json will contain the stored tuple if present
        if (json && Object.keys(json).length > 0) {
          setVerifyResult({ found: true, data: json })
        } else {
          setVerifyResult({ found: false })
        }
      } else if (res.status === 404) {
        setVerifyResult({ found: false })
      } else {
        const txt = await res.text()
        setVerifyResult({ found: false, error: txt })
      }

      // 2) Search transactions by memo as fallback (some users used memo method)
      // Use Hiro API to search transactions with memo filter
      const memoSearchUrl = `https://stacks-blockchain-api.hiro.so/extended/v1/transactions?memo=${hash}`
      const memoRes = await fetch(memoSearchUrl)
      const memoJson = await memoRes.json()
      if (memoJson && memoJson.results && memoJson.results.length > 0) {
        setVerifyResult(prev => ({ ...prev, memoMatches: memoJson.results }))
      }
      setStatus('')
    } catch (err) {
      console.error(err)
      setStatus('Error: ' + (err.message || String(err)))
    }
  }

  return (
    <div className="verify">
      <input type="file" onChange={handleFile} />
      {hash && <div>SHA-256: <code style={{wordBreak:'break-all'}}>{hash}</code></div>}
      <div style={{marginTop:8}}>
        <button onClick={verify} disabled={!hash}>Verify</button>
      </div>
      <div className="status">{status}</div>
      {verifyResult && (
        <div style={{marginTop:12}}>
          {verifyResult.found ? (
            <div>
              <strong>Found in contract map:</strong>
              <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(verifyResult.data, null, 2)}</pre>
            </div>
          ) : (
            <div>Not found in contract data map.</div>
          )}

          {verifyResult.memoMatches && verifyResult.memoMatches.length > 0 && (
            <div style={{marginTop:8}}>
              <strong>Memo matches (transactions):</strong>
              <ul>
                {verifyResult.memoMatches.map(tx => (
                  <li key={tx.tx_id}>
                    <a href={`https://explorer.hiro.so/txid/${tx.tx_id}?network=mainnet`} target="_blank" rel="noreferrer">{tx.tx_id}</a>
                    — status: {tx.tx_status}, block: {tx.burn_block_time}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
