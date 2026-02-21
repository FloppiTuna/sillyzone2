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
    import { mount, unmount, getAllContexts, onMount, onDestroy } from 'svelte';
    import type { Readable } from "node:stream";

    const paneManager = usePM();
    const ctx = getAllContexts();
    
    const appManager = new AppManager({
        paneManager
    })

    appManager.registerApp('example', new ExampleApp());
    appManager.registerApp('login', new TrfLogon());
    appManager.registerApp('shell', new TrfShell());

    // Start with the login app
    appManager.executeApp('login');
    appManager.executeApp('shell'); // for testing

    let portalTarget: HTMLDivElement;
    const windowInstances = new Map();
    let unsub;

    onMount(() => {
        unsub = openWindows.subscribe(windows => {
            if (!portalTarget) return;

            const currentIds = new Set(windows.map(w => w.id));

            // Remove windows that no longer exist
            for (const [id, instance] of windowInstances) {
                if (!currentIds.has(id)) {
                    unmount(instance);
                    windowInstances.delete(id);
                }
            }

            // Add new windows
            for (const win of windows) {
                if (!windowInstances.has(win.id)) {
                    const comp = mount(WindowRenderer, {
                        target: portalTarget,
                        props: { pane: win },
                        context: ctx
                    });
                    windowInstances.set(win.id, comp);
                }
            }
        });
    });

    onDestroy(() => {
        unsub?.();
        for (const instance of windowInstances.values()) {
            unmount(instance);
        }
        windowInstances.clear();
    });
</script>

<div class="h-dvh w-dvw workspace">
    <div bind:this={portalTarget} data-pane-portal-target="main-panel" class="h-full w-full portal-target">
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
