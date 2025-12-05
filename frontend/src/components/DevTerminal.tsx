import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

export function DevTerminal() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const term = new Terminal({ cursorBlink: true, fontFamily: 'SFMono-Regular, Menlo, monospace', theme: { background: '#0f0f1a' } })
    const prompt = () => {
      term.write('\r\n$ ')
    }

    term.open(containerRef.current!)
    term.writeln('mina dev-terminal ready (ghostty)')
    prompt()

    const disposable = term.onData((data) => {
      if (data === '\r') {
        term.write('\r\nRunning: simulated command...')
        prompt()
        return
      }
      if (data === '\u0003') {
        term.write('^C')
        prompt()
        return
      }
      term.write(data)
    })

    term.focus()
    return () => {
      disposable.dispose()
      term.dispose()
    }
  }, [])

  return <div ref={containerRef} style={{ minHeight: 220, width: '100%', borderRadius: 12, overflow: 'hidden' }} />
}
