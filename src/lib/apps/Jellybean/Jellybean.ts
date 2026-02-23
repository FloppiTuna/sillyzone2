import { TruffleApplication } from "../TruffleApplication";
import JellybeanLoader from "./windows/JellybeanLoader.svelte";
import JellybeanSelector from "./windows/JellybeanSelector.svelte";

export class Jellybean extends TruffleApplication {
    constructor() {
        super("Jellybean", "Play ToonTown Rewritten over ");
    }

    run() {
        this.renderWindow({
            id: 'game-selector',
            portalId: 'main-panel',
            title: 'Jellybean - Game Selector',
            size: { width: 400, height: 150 },
            renderTitlebar: true,
            component: JellybeanSelector,
            props: {
                onSelect: (game: string) => {
                    this.renderWindow({
                        id: 'game-loader',
                        portalId: 'main-panel',
                        title: `Loading ${game}...`,
                        size: { width: 275, height: 100 },
                        renderTitlebar: true,
                        component: JellybeanLoader,
                    })
                }
            }
        })
    }
}