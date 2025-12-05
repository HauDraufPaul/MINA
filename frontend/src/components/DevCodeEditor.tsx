import Editor from '@monaco-editor/react'

export function DevCodeEditor() {
  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', minHeight: 320 }}>
      <Editor
        height="320px"
        defaultLanguage="typescript"
        defaultValue={`// mina Dev Hub editor\nfunction hello() {\n  console.log('Welcome to mina create hub')\n}`}
        theme="vs-dark"
        options={{ fontSize: 14, tabSize: 2, minimap: { enabled: false }, automaticLayout: true }}
      />
    </div>
  )
}
