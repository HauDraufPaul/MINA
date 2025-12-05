// This file is generated via scripts/generate-ipc.js
import { invoke } from '@tauri-apps/api/tauri'

export type StatusPayload = {
  version: string
  uptime: number
}

export type FeedOperationResult = {
  success: boolean
  message?: string
}

export type TerminalOutput = {
  id: string
  output: string
}

export type CommandSchema = {
  'core.status': { args: {}, result: StatusPayload }
  'feeds.add': { args: { url: string }, result: FeedOperationResult }
  'terminal.run': { args: { command: string, cwd: string | null }, result: TerminalOutput }
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

