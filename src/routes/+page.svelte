<script>
    import { PanekitProvider } from "panekit";
    import "panekit/index.css";
    import "98.css";
    import { usePM } from "panekit";
    import { AppManager } from "$lib/appManager";
    import { ExampleApp } from "$lib/apps/ExampleApp";
    import { TrfLogon } from "$lib/apps/TrfLogon/TrfLogon";
    import { openWindows } from "$lib/stores/windowStore";
    import WindowRenderer from "$lib/components/WindowRenderer.svelte";

    const paneManager = usePM();

    const appManager = new AppManager({
        paneManager
    })

    appManager.registerApp('example', new ExampleApp());
    appManager.registerApp('login', new TrfLogon());

    // Start with the login app
    appManager.executeApp('login');

</script>

<div class="h-dvh w-dvw workspace">
    {#each $openWindows as window (window.id)}
        <WindowRenderer {window} />
    {/each}
</div>

<style>
    .workspace {
        position: absolute;
        background-color: #008080;
        overflow: hidden;
    }

    :global(.window-body) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
