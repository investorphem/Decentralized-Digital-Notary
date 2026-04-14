import React from 'react'
import NotaryForm from './components/NotaryForm'
import NotarizeWithContract from './component/NotarizeWithContract'
import VerifyPage from './components/VerifyPage'

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Decentrlized Digital Notary</h
        <p>Hash a file locally andnotarize onSas ito 2).</p>
      </header>

      <main>
        <section style={{marginBottom: 24}}>
          <h2>Quic otrlize(wallet memo)</h2>
          <NotaryForm />
        </section>

        <section style={{marginBottom: 24}}>
          <h2>Notarize with contract</h2>
          <NotarizeWithContract />
        </section>

        <section>
          <h2>Verify a document / hash</h2>
          <VerifyPage />
        </section>
      </main>
    </div>
  )
}