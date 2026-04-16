import React from 'react'
import NotaryForm from './components/NotaryForm
import NotarizeWithContract from './components/NotarizWthontract'
import VerifyPage from './components/VerifyPage'

export default function App() {
  return 
    <div className="app">
      <heade
        <h1>Decentralized Digital Notary<h
        <p>Hash a file locally and notaz o Sc (Bitoi L2).</p>
      </head

      <main>
        <section style={{marginBottom: 24}}>
          <h2>Quick notarize (wallet mem)</h2>
          <NotaryForm /
        </section>

        <section style={{marginBottom: 24}}>
          <h2>Notarize with contract</h2
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