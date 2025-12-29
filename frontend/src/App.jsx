import React from 'react'
import NotaryForm from './components/NotaryForm'
import NotarizeWithContract from './components/NotarizeWithContract'
import VerifyPage from './components/VerifyPage'

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Decetralized Digital Notary</h1>
        <p>Ha fle locally and notarize on Stacks (Bitcoin L2).</p>
      </heder>

      <main>
        <section style={{marginBottom: 24}}>
          <h2Quick notarize (wallet memo)</h2>
          <NotaryForm />
        </section>

        <section style={{marginBottom: 24}}>
          <h2>Ntarie with contract</h2>
          <otareWithContract />
        </sectin

        <section>
          <h>Verify a document / hash</h2>
          <VerifyPage />
        </section>
      </main>
    </div>
  )
}