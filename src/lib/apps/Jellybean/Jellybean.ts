import { TruffleApplication } from "../TruffleApplication";
import JellybeanHQBuddy from "./windows/JellybeanHQBuddy.svelte";
import JellybeanLoader from "./windows/JellybeanLoader.svelte";
import JellybeanPlayer from "./windows/JellybeanPlayer.svelte";
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
                        size: { width: 275, height: 125 },
                        renderTitlebar: true,
                        component: JellybeanLoader,
                        props: {
                            showPlayer: () => {
                                this.swapWindow('game-loader', {
                                    id: 'game-player',
                                    portalId: 'main-panel',
                                    title: `ToonTown Rewritten`,
                                    size: { width: 800, height: 600 },
                                    renderTitlebar: true,
                                    component: JellybeanPlayer,
                                })
                                this.renderWindow({
                                    id: 'hq-buddy',
                                    portalId: 'main-panel',
                                    title: `ToonHQ Buddy`,
                                    size: { width: 215, height: 600 },
                                    renderTitlebar: true,
                                    component: JellybeanHQBuddy,
                                })
                            }
                        }
                    })
                }
            }
        })
    }
}