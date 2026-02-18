export class AppManager {
    private appRegistry: Map<string, any> = new Map();
    private paneManager: any; // Assuming paneManager is defined elsewhere

    constructor({
        paneManager,
    }: {
        paneManager: any;
    }) {
        this.paneManager = paneManager;

        console.log("AppManager initialized with paneManager:", this.paneManager);
    }

    public registerApp(appId: string, appInstance: any) {
        if (this.appRegistry.has(appId)) {
            console.warn(`App with id ${appId} is already registered. Overwriting.`);
        }
        // Pass paneManager to the app if it has setPaneManager method
        if (typeof appInstance.setPaneManager === 'function') {
            appInstance.setPaneManager(this.paneManager);
        }
        this.appRegistry.set(appId, appInstance);
    }

    public executeApp(appId: string) {
        const app = this.appRegistry.get(appId);

        if (!app) {
            console.error(`App with id ${appId} not found.`);
            return;
        }

        if (typeof app.run === "function") {
            app.run();
        } else {
            console.error(`App with id ${appId} does not have a valid run method.`);
        }
    }
}