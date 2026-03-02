import { addWindow, removeWindow } from "$lib/stores/windowStore";
import BasicAlert from "./dialogs/BasicAlert.svelte";

export async function showBasicAlert(title: string, message: string, options: string[] = ["OK"]): Promise<string> {
    return new Promise((resolve) => {
        const windowId = `basic-alert-${Date.now()}`;
        addWindow({
            id: windowId,
            title: title,
            size: { width: 300, height: 100 },
            component: BasicAlert,
            props: {
                message,
                options,
                onAnswered: (answer: string) => {
                    removeWindow(windowId);
                    resolve(answer);
                }
            }
        });
    })
}