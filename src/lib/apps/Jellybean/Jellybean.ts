import { TruffleApplication } from "../TruffleApplication";
import JellybeanHQBuddy from "./windows/JellybeanHQBuddy.svelte";
import JellybeanHQBuddyGroupInfo from "./windows/JellybeanHQBuddyGroupInfo.svelte";
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
                            showPlayer: (hostPort: number) => {
                                this.swapWindow('game-loader', {
                                    id: 'game-player',
                                    portalId: 'main-panel',
                                    title: `ToonTown Rewritten`,
                                    size: { width: 800, height: 600 },
                                    renderTitlebar: true,
                                    component: JellybeanPlayer,
                                    props: {
                                        hostPort
                                    },
                                    menuItems: [
                                        {
                                            label: "Game",
                                            submenu: [
                                                { label: "Reload" },
                                                { label: "Exit", action: () => this.closeWindow('game-player') }
                                            ]
                                        }
                                    ]
                                })
                                this.renderWindow({
                                    id: 'hq-buddy',
                                    portalId: 'main-panel',
                                    title: `ToonHQ Buddy`,
                                    size: { width: 230, height: 600 },
                                    renderTitlebar: true,
                                    component: JellybeanHQBuddy,
                                    props: {
                                        openGroupDetails: (group: any) => this.renderWindow({
                                            id: 'group-details',
                                            portalId: 'main-panel',
                                            title: `ToonHQ ~ Group Details`,
                                            size: { width: 400, height: 300 },
                                            renderTitlebar: true,
                                            component: JellybeanHQBuddyGroupInfo,
                                            props: {
                                                group
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }
}