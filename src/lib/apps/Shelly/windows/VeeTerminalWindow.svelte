<script lang="ts">
  import { executeApp, getAllApps, getAppByName } from "$lib/stores/appManagerStore";

  type Message = {
    type : 'input' | 'output';
    text: string;
    timestamp?: Date;
  }

  type Command = {
    description: string;
    usage: string;
    execute: (args: string[]) => void;
  }

  let messages: Message[] = $state([
    { type: 'output', text: 'Welcome to VeeTerm!' },
    { type: 'output', text: 'Type "help" for a list of commands.' }
  ])

  function print(side: 'input' | 'output', text: string) {
    messages.push({ type: side, text, timestamp: new Date() });
  }

  const commands: Record<string, Command> = {
    help: {
      description: 'Lists available commands.',
      usage: 'help',
      execute: () => {
        print('output', 'Available commands:');
        for (const cmd in commands) {
          print('output', `${cmd} - ${commands[cmd].description}`);
        }
      }
    },
    echo: {
      description: 'Echoes the input back to the terminal.',
      usage: 'echo <text>',
      execute: (args: string[]) => {
        print('output', args.join(' '));
      }
    },
    clear: {
      description: 'Clears the terminal screen.',
      usage: 'clear',
      execute: () => {
        messages.length = 0;
      }
    },
    exec: {
      description: 'Executes an application by name.',
      usage: 'exec <appname>',
      execute: (args: string[]) => {
        if (args.length < 1) {
          print('output', 'Usage: exec <appname>');
          return;
        }
        const appName = args[0];
        const app = getAppByName(appName);
        if (app) {
          print('output', `Executing ${appName}`);
          executeApp(appName);
        } else {
          print('output', `App not found: ${appName}`);
        }
      }
    },
    apps: {
      description: 'Lists installed applications.',
      usage: 'apps',
      execute: () => {
        messages.push({ type: 'output', text: 'Installed applications:' });
        const apps = getAllApps();
        for (const [name, app] of apps) {
          print('output', `${name} - ${app.description}`);
        }
        
      }
    },
    DEFAULT: {
      description: 'Default command for unknown inputs.',
      usage: '<command>',
      execute: (args: string[]) => {
        const cmd = args[0];
        print('output', `Unknown command: ${cmd}`);

        // hey was that command actually the name of an application? lets check
        // if it was, we'll execute it
        if (getAppByName(cmd)) {
          print('output', `Did you mean to type "exec ${cmd}"?`);
        }
      }
    }
  }




  function handleInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const input = (event.target as HTMLInputElement).value;
      print('input', input);
      (event.target as HTMLInputElement).value = '';

      const args = input.split(' ');
      const command = args[0].toLowerCase();

      if (commands[command]) {
        commands[command].execute(args.slice(1));
      } else {
        commands.DEFAULT.execute(args);
      }
    }
  }


</script>

<div class="terminal-body">
  {#each messages as msg}
    <div class={msg.type === 'input' ? 'message-input' : 'message-output'}>
      <span>{msg.text}</span>
      <span class="timestamp">{msg.timestamp ? ` (${msg.timestamp.toLocaleTimeString()})` : ''}</span>
    </div>
  {/each}
</div>
<div class="terminal-input">
  <input type="text" onkeydown={handleInput} />
</div>


<style>
  .terminal-body {
    width: 100%;
    height: 100%;
    background-color: black;
    color: white;
    font-family: monospace;
    padding: 8px;
    box-sizing: border-box;
  }

  .terminal-input {
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
    background-color: #222;
  }

  .terminal-input input {
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
    background-color: #333;
    color: white;
    border: none;
    font-family: monospace;
  }

  .message-input {
    width: 100%;
    display: flex;
    color: lightgreen;
    justify-content: space-between;
  }

  .message-output {
    width: 100%;
    display: flex;
    color: white;
    justify-content: space-between;
  }

  .timestamp {
    font-size: 0.8em;
    color: gray;
  }

</style>