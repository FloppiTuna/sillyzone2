<script lang="ts">
    import { PanekitProvider } from "panekit";
    import "panekit/index.css";
    import "98.css";
    import { usePM } from "panekit";
    import { AppManager } from "$lib/appManager";
    import { ExampleApp } from "$lib/apps/ExampleApp";
    import { TrfLogon } from "$lib/apps/TrfLogon/TrfLogon";
    import { openWindows, type OpenWindow } from "$lib/stores/windowStore";
    import WindowRenderer from "$lib/components/WindowRenderer.svelte";
    import { TrfShell } from "$lib/apps/TrfShell/TrfShell";
    import { getAllContexts } from 'svelte';
    import { initAppManager, registerApp, executeApp } from "$lib/stores/appManagerStore";
    import { VeeTerm } from "$lib/apps/Shelly/VeeTerm";
    import { Jellybean } from "$lib/apps/Jellybean/Jellybean";


    const paneManager = usePM();
    const ctx = getAllContexts();
    
    initAppManager(paneManager);

    registerApp('example', new ExampleApp());
    registerApp('login', new TrfLogon());
    registerApp('shell', new TrfShell());
    registerApp('veeterm', new VeeTerm());
    registerApp('jellybean', new Jellybean())

    executeApp('login');
</script>

<div class="h-dvh w-dvw workspace">
    <div data-pane-portal-target="main-panel" class="h-full w-full portal-target">
        {#each $openWindows as pane (pane.id)}
            <WindowRenderer {pane} />
        {/each}
    </div>
</div>

<style>
    .workspace {
        position: absolute;
        background-color: #008080;
        overflow: hidden;
    }

    .portal-target {
        position: relative;
    }

    :global(.window-body) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
