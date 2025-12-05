const { writeFileSync, mkdirSync } = require('node:fs')
const { join } = require('node:path')

const commands = [
  {
    name: 'core.status',
    args: [],
    result: 'StatusPayload',
    doc: 'General application status.'
  },
  {
    name: 'feeds.add',
    args: [{ name: 'url', type: 'string' }],
    result: 'FeedOperationResult',
    doc: 'Add or refresh an RSS feed.'
  },
  {
    name: 'terminal.run',
    args: [
      { name: 'command', type: 'string' },
      { name: 'cwd', type: 'string | null' }
    ],
    result: 'TerminalOutput',
    doc: 'Run a command inside the Dev-Hub terminal.'
  }
]

const types = {
  StatusPayload: `{
  version: string
  uptime: number
}`,
  FeedOperationResult: `{
  success: boolean
  message?: string
}`,
  TerminalOutput: `{
  id: string
  output: string
}`
}

const directory = join(__dirname, '..', 'frontend', 'src', 'generated')
mkdirSync(directory, { recursive: true })

const commandEntries = commands
  .map((cmd) => {
    const argsDefinition =
      cmd.args.length === 0
        ? '{}'
        : `{ ${cmd.args.map((arg) => `${arg.name}: ${arg.type}`).join(', ')} }`
    return `  '${cmd.name}': { args: ${argsDefinition}, result: ${cmd.result} }`
  })
  .join('\n')

const typeDefs = Object.entries(types)
  .map(([name, definition]) => `export type ${name} = ${definition}`)
  .join('\n\n')

const content = `// This file is generated via scripts/generate-ipc.js
import { invoke } from '@tauri-apps/api/tauri'

${typeDefs}

export type CommandSchema = {
${commandEntries}
}

export type CommandArgs<Cmd extends keyof CommandSchema> = CommandSchema[Cmd]['args']
export type CommandResult<Cmd extends keyof CommandSchema> = CommandSchema[Cmd]['result']

export async function invokeCommand<Cmd extends keyof CommandSchema>(
  command: Cmd,
  args: CommandArgs<Cmd>
): Promise<CommandResult<Cmd>> {
  const payload = args as Record<string, unknown>
  return invoke(command, payload) as Promise<CommandResult<Cmd>>
}
`

writeFileSync(join(directory, 'tauri-api.ts'), content + '\n')
console.log('Generated frontend/src/generated/tauri-api.ts')