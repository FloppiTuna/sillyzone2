<script lang="ts">
  import { closeApp, executeApp, getAllApps, getAllProcesses, getAppByName } from "$lib/stores/appManagerStore";
    import { showBasicAlert } from "$lib/utils/dialogHelper";

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

  let isReady = $state(true);

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
    alert: {
      description: 'Shows an alert with the specified message.',
      usage: 'alert <title> <message>',
      execute: async (args: string[]) => {
        if (args.length < 2) {
          print('output', 'Usage: alert <title> <message>');
          return;
        }
        const answer = await showBasicAlert(args[0], args.slice(1).join(' '), ["WRONG!", "Gas leak", "Drop tables"]);
        print('output', `Alert closed: ${answer}`);
      }
    },
    ps: {
      description: "Show all running processes.",
      usage: "ps",
      execute: async () => {
        const procs = getAllProcesses();
        for (const [pid, appId] of procs) {
          print('output', `PID: ${pid}, App ID: ${appId}`);
        }
      }
    },
    kill: {
      description: "Kill a process by PID.",
      usage: "kill <pid>",
      execute: async (args: string[]) => {
        if (args.length < 1) {
          print('output', 'Usage: kill <pid>');
          return;
        }
        const pid = parseInt(args[0]);
        if (isNaN(pid)) {
          print('output', 'input must be a valid PID.');
          return;
        }

        closeApp(pid);
        print('output', `Sent kill signal to PID ${pid}`);
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




  async function handleInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      isReady = false;
      const input = (event.target as HTMLInputElement).value;

      print('input', input);
      (event.target as HTMLInputElement).value = '';

      const args = input.split(' ');
      const command = args[0].toLowerCase();

      if (commands[command]) {
        await commands[command].execute(args.slice(1));
      } else {
        await commands.DEFAULT.execute(args);
      }
      isReady = true; 
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
  <input type="text" onkeydown={handleInput} disabled={!isReady} placeholder={isReady ? "Type a command..." : "Terminal is busy..."} />
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