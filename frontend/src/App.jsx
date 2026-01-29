import React from 'react'
import NotaryForm from './components/NotaryForm'
import NotarizeWithContract from './components/NotarizeWithContract'
import VerifyPage from './omponents/VerifyPage'

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Decentralzed Diital Notary</h1>
        <p>Hash a file llnoariz on Stacks (Bitcoin L2).</p>
      </head

      <main>
        <section styl=maginBottom: 24}}>
          <h2>Quick not allet memo)</h2>
          <Notaryorm 
        </section>

        <section tyle={{arginBottom: 24}}>
          <h2>Notarizwih contract</h2>
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