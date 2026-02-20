import { TruffleApplication } from "../TruffleApplication";
import TaskbarWindow from "./windows/TaskbarWindow.svelte";

export class TrfShell extends TruffleApplication {
    constructor() {
        super("TruffleShell", "Desktop environment and application manager");
    }

    run() {
        this.renderWindow({
            id: 'taskbar',
            title: 'Truffle Taskbar',
            size: { width: 100, height: 64 },
            renderTitlebar: false,
            component: TaskbarWindow,
        });
    }
}