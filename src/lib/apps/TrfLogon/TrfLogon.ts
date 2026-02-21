import { TruffleApplication } from "$lib/apps/TruffleApplication";
import LoginWindow from "./windows/LoginWindow.svelte";
import type { OpenWindow } from "$lib/stores/windowStore";
import LoadingWindow from "./windows/LoadingWindow.svelte";
import { setSession } from "$lib/stores/sessionStore";

export class TrfLogon extends TruffleApplication {
    constructor() {
        super("TrfLogon", "Login manager");
    }

    run() {
        console.log('TrfLogon!');
        
        const loginWindow: OpenWindow = {
            id: 'login',
            renderTitlebar: true,
            title: 'Welcome to the Glenn Quagmire',
            size: { width: 450, height: 180 },
            constrainToPortal: true,
            portalId: 'main-panel',
            component: LoginWindow,
            props: {
                onLogin: async (username: string, password: string) => {
                    const response = await fetch('/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    const data = await response.json();

                    setSession(
                        "WIP",
                        "WIP",
                        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    )

                    return data.success;
                },
                beginLoading: async () => {
                    this.swapWindow('login', {
                        id: 'loading',
                        title: 'Loading...',
                        size: { width: 350, height: 150 },
                        constrainToPortal: true,
                        portalId: 'main-panel',
                        component: LoadingWindow,
                    });
                }
            }
        };
        
        this.renderWindow(loginWindow);
    }
}