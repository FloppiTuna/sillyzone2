import type { OpenWindow } from "$lib/stores/windowStore";
import { addWindow, removeWindow, replaceWindow } from "$lib/stores/windowStore";

export class TruffleApplication {
    protected name: string;
    protected description: string;
        
    /**
     * Construct the application.
     * @param name The name of the application.
     * @param description The application's description.
     */
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    /**
     * Render a window.
     */
    protected renderWindow(window: OpenWindow) {
        addWindow(window);

        return window.id;
    }

    protected closeWindow(windowId: string) {
        removeWindow(windowId);
    }

    protected swapWindow(removeId: string, newWindow: OpenWindow) {
        replaceWindow(removeId, newWindow);
        return newWindow.id;
    }

    /**
     * Runs before the application is closed, allowing for cleanup of any resources or windows.
     */
    cleanup() {
        // To be implemented by subclasses
    }

    /**
     * Begin execution of the application.
     */
    run() {
        // To be implemented by subclasses
    }
}