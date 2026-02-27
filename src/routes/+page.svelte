<script lang="ts">
    import { PanekitProvider } from "panekit";
    import "panekit/index.css";
    // todo: this is really stupid pls gang just merge the fuckin menu bar support
    import "98.css";
    import "$lib/assets/menusupport.css";

    import { usePM } from "panekit";
    import { ExampleApp } from "$lib/apps/ExampleApp";
    import { TrfLogon } from "$lib/apps/TrfLogon/TrfLogon";
    import { openWindows, type OpenWindow } from "$lib/stores/windowStore";
    import WindowRenderer from "$lib/components/WindowRenderer.svelte";
    import { TrfShell } from "$lib/apps/TrfShell/TrfShell";
    import { getAllContexts, onMount } from "svelte";
    import {
        initAppManager,
        registerApp,
        executeApp,
    } from "$lib/stores/appManagerStore";
    import { VeeTerm } from "$lib/apps/Shelly/VeeTerm";
    import { Jellybean } from "$lib/apps/Jellybean/Jellybean";
    import { FlimFlam } from "$lib/apps/FlimFlam/FlimFlam";
    import { setSession } from "$lib/stores/sessionStore";

    let { data } = $props();

    const paneManager = usePM();
    const ctx = getAllContexts();

    initAppManager(paneManager);

    registerApp("example", new ExampleApp());
    registerApp("login", new TrfLogon());
    registerApp("shell", new TrfShell());
    registerApp("veeterm", new VeeTerm());
    registerApp("jellybean", new Jellybean());
    registerApp("flimflam", new FlimFlam());

    onMount(() => {
        if (data.session) {
            setSession(
                data.session.username,
                data.session.username,
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            );
            executeApp("shell");
        } else {
            executeApp("login");
        }
    });
</script>

<div class="h-dvh w-dvw workspace">
    <div
        data-pane-portal-target="main-panel"
        class="h-full w-full portal-target"
    >
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

    /* custom sillyzone styling */
    :global(.title-bar) {
        background: linear-gradient(90deg, #410069, #9D00FF);
    }
</style>
