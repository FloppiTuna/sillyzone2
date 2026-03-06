import { writable } from "svelte/store";

export const appRegistry = writable<Map<string, any>>(new Map());
export const processes = writable<Map<number, string>>(new Map());
let paneManager: any = null;

export function initAppManager(paneManagerInstance: any) {
    console.log("AppManager has been initialized with paneManager:", paneManagerInstance);
    paneManager = paneManagerInstance;
}

export function registerApp(appId: string, appInstance: any) {
    appRegistry.update(registry => {
        if (registry.has(appId)) {
            console.warn(`App with id ${appId} is already registered. Overwriting.`);
        }
        // Pass paneManager to the app if it has setPaneManager method
        if (typeof appInstance.setPaneManager === 'function') {
            appInstance.setPaneManager(paneManager);
        }
        registry.set(appId, appInstance);

        console.log(`Registered app '${appId}'!`, registry);
        return registry;
    });
}

export function executeApp(appId: string) {
    if (!paneManager) {
        console.warn(`Executing application ${appId} with no registered paneManager!`);
        return;
    }

    let appInstance: any;
    appRegistry.subscribe(registry => {
        appInstance = registry.get(appId);
    })();

    if (!appInstance) {
        console.error(`App with id ${appId} not found.`);
        return;
    }

    if (typeof appInstance.run === "function") {
        appInstance.run();
    } else {
        console.error(`App with id ${appId} does not have a valid run method.`);
    }

    processes.update(procs => {
        const pid = Date.now(); // Simple PID generation using timestamp
        procs.set(pid, appId);
        return procs;
    });
}

export function closeApp(pid: number) {
    let appId: string | undefined;
    processes.update(procs => {
        appId = procs.get(pid);
        if (appId) {
            procs.delete(pid);
        }
        return procs;
    });

    if (!appId) {
        console.warn(`No process found with PID ${pid}`);
        return;
    }

    let appInstance: any;
    appRegistry.subscribe(registry => {
        appInstance = registry.get(appId!);
    })();

    if (appInstance && typeof appInstance.cleanup === "function") {
        appInstance.cleanup();
    } else {
        console.warn(`App with id ${appId} does not have a cleanup method. Closing all of it's windows anyways.`);
    }
}


export function getAppByName(appId: string) {
    let appInstance: any;
    appRegistry.subscribe(registry => {
        appInstance = registry.get(appId);
    })();
    return appInstance;
}

export function getAllApps() {
    let apps: Map<string, any>;
    appRegistry.subscribe(registry => {
        apps = registry;
    })();
    return apps;
}

export function getAllProcesses() {
    let procs: Map<number, string>;
    processes.subscribe(value => {
        procs = value;
    })();
    return procs!;
}