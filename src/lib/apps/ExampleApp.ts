import { TruffleApplication } from "./TruffleApplication";

export class ExampleApp extends TruffleApplication {
    constructor() {
        super("Example App", "An example application to demonstrate the framework.");
        console.log('ExampleApp initialized');
    }

    run() {
        console.log('ExampleApp is running');
    }
}