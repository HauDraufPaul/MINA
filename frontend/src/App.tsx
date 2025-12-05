import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { DevCodeEditor } from './components/DevCodeEditor'
import { DevTerminal } from './components/DevTerminal'
import { invokeCommand, StatusPayload } from './generated/tauri-api'

export default function App() {
  const [status, setStatus] = useState<StatusPayload | null>(null)
  useEffect(() => {
    invokeCommand('core.status', {})
      .then(setStatus)
      .catch((error) => console.warn('unable to read status', error))
  }, [])

  const statusDetails = useMemo(() => {
    if (!status) return 'Awaiting backend...'
    return `v${status.version} · uptime ${Math.round(status.uptime)}s`
  }, [status])

  return (
    <div className="app-shell">
      <header className="header">
        <div>
          <h1>mina</h1>
          <p style={{ margin: 0, color: '#bfc6e0' }}>{statusDetails}</p>
        </div>
        <button className="frosted-panel panel" style={{ padding: '10px 18px', border: 'none', cursor: 'pointer' }}>
          Ollama Chat
        </button>
      </header>

      <section className="hub-grid">
        <article className="frosted-panel panel">
          <h2 className="panel-title">Personal Hub</h2>
          <p>Music index, LEGO collections, and dashboard widgets.</p>
        </article>
        <article className="frosted-panel panel">
          <h2 className="panel-title">Dev Hub</h2>
          <div className="glass-grid">
            <section>
              <h3 className="panel-title">Terminal</h3>
              <div className="terminal-wrapper">
                <DevTerminal />
              </div>
            </section>
            <section>
              <h3 className="panel-title">Code Editor</h3>
              <DevCodeEditor />
            </section>
          </div>
        </article>
        <article className="frosted-panel panel">
          <h2 className="panel-title">Create Hub</h2>
          <p>Processing-like canvas & creative playground will reside here.</p>
        </article>
      </section>

      <section className="frosted-panel panel" style={{ marginTop: 24 }}>
        <h2 className="panel-title">Dashboards (Drag + Drop coming soon)</h2>
        <p>Snap to grid widgets per hub will live inside these panels.</p>
      </section>
    </div>
  )
}
