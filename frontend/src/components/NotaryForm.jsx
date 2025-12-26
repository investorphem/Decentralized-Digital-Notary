import React, { useState } from 'react'
import { sha256 } from 'js-sha256'
import { showConnect, makeSTXTokenTransfer } from '@stacks/connect'

// NOTE: showConnect / makeSTXTokenTransfer API can vary by version. This code follows common patterns.

export default function NotaryForm() {
  const [fileName, setFileName] = useState(null)
  const [fileSize, setFileSize] = useState(null)
  const [hashHex, setHashHex] = useState('')
  const [txId, setTxId] = useState(null)
  const [status, setStatus] = useState('')
  const [copied, setCopied] = useState(false)
  const [timestamp, setTimestamp] = useState(null)

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    setFileSize(file.size)
    const arrayBuffer = await file.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)
    // compute sha-256 hex
    const digest = sha256(bytes)
    setHashHex(digest)
    setTimestamp(new Date().toLocaleString())
    setCopied(false)
  }

  function copyHash() {
    navigator.clipboard.writeText(hashHex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  async function notarize() {
    if (!hashHex) return alert('Please select a file first')
    setStatus('Opening wallet...')

    try {
      const authOptions = {
        // optional
        appName: 'Decentralized Notary',
        manifestPath: '/manifest.json'
      }

      // showConnect returns wallet session info; this opening might vary by version.
      await showConnect(authOptions)

      setStatus('Requesting signature...')

      const txOptions = {
        recipient: 'SP000000000000000000002Q6VF78', // a burn/static address, 0 STX
        amount: '0',
        memo: hashHex,
        onFinish: data => {
          setTxId(data.txId)
          setStatus('Submitted: ' + data.txId)
        },
        onCancel: () => setStatus('User cancelled')
      }

      await makeSTXTokenTransfer(txOptions)
    } catch (err) {
      console.error(err)
      setStatus('Error: ' + (err.message || err.toString()))
    }
  }

  return (
    <div className="notary">
      <input type="file" onChange={handleFile} />
      {fileName && (
        <div style={{marginTop:'8px', fontSize:'14px', color:'#94a3b8'}}>
          Selected: <strong>{fileName}</strong> ({formatBytes(fileSize)})
        </div>
      )}
      {hashHex && (
        <div>
          <div style={{display:'flex', alignItems:'center', gap:'8px', marginTop:'8px'}}>
            <div><strong>SHA-256:</strong> {hashHex}</div>
            <button onClick={copyHash} style={{padding:'4px 8px', fontSize:'12px'}}>
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          {timestamp && <div style={{fontSize:'12px', color:'#64748b', marginTop:'4px'}}>Generated: {timestamp}</div>}
        </div>
      )}
      <div style={{marginTop:8}}>
        <button onClick={notarize} disabled={!hashHex}>Notarize via wallet (memo)</button>
      </div>

      <div className="status">{status}</div>

      {txId && (
        <div style={{marginTop:8}}>
          <a href={`https://explorer.hiro.so/txid/${txId}?network=mainnet`} target="_blank" rel="noreferrer">View transaction on Hiro Explorer</a>
        </div>
      )}
    </div>
  )
}