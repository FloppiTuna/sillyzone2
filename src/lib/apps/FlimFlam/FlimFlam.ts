import { TruffleApplication } from "../TruffleApplication";
import FlimFlamSplash from "./windows/FlimFlamSplash.svelte";

export class FlimFlam extends TruffleApplication {
    constructor() {
        super("FlimFlam", "Chat and play online with your fellow sillyzone friends!");
    }

    run() {
        this.renderWindow({
            id: 'flimflam-main',
            portalId: 'main-panel',
            title: 'FlimFlam - Main Menu',
            size: { width: 500, height: 160 },
            constrainToPortal: true,
            renderTitlebar: true,
            component: FlimFlamSplash,
        })
    }
}