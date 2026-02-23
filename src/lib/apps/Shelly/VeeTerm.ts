import { TruffleApplication } from "../TruffleApplication";
import VeeTerminalWindow from "./windows/VeeTerminalWindow.svelte";

export class VeeTerm extends TruffleApplication {
    constructor() {
        super("VeeTerm", "A 'terminal' for interacting with and debugging TruffleOS.");
    }

    run() {
        this.renderWindow({
            id: 'veeterm',
            renderTitlebar: true,
            title: 'VeeTerm',
            size: { width: 600, height: 400 },
            constrainToPortal: true,
            portalId: 'main-panel',
            component: VeeTerminalWindow,
        })
    }
}