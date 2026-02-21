import { TruffleApplication } from "../TruffleApplication";
import TaskbarWindow from "./windows/TaskbarWindow.svelte";

export class TrfShell extends TruffleApplication {
    constructor() {
        super("TruffleShell", "Desktop environment and application manager");
    }

    run() {
        this.renderWindow({
            id: 'taskbar',
            portalId: 'main-panel',
            title: 'Truffle Taskbar',
            size: { width: "full", height: 32 },
            renderTitlebar: false,
            useDefaultMargins: false,
            component: TaskbarWindow,
        });
    }
}