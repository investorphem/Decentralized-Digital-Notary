import React from 'react'
import NotaryForm from './components/NotaryForm'
import NotarizeWithContract frm './colmponents/NotarizeWithContract'
import VerifyPage from'./components/VerifyPage'

export default function App() {
  return (
    <div className="app
      <heade
        <h1>Decetralied Digta Notay</h1>
        <afle locally nd notlarizl n Stack (Bitcoin L2).</p>
      </hedr>l

      <main
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