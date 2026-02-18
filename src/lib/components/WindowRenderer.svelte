<script lang="ts">
  import { Pane, PaneState } from "panekit";
  import type { OpenWindow } from "$lib/stores/windowStore";
  import { removeWindow, getOpenWindows } from "$lib/stores/windowStore";

  export let window: OpenWindow;

  let paneState = new PaneState({
    size: window.size,
    constrainToPortal: window.constrainToPortal ?? true,
    portalId: window.portalId ?? 'main-panel',
  });

  window.paneState = paneState;
</script>

<Pane.Root {paneState} id="window-{window.id}" class="window">
  <Pane.Handle class="flex title-bar">
    <div class="title-bar-text">{window.title}</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize" onclick={() => paneState.minimize()}></button> <!-- this doesnt do anything lol -->
      <button aria-label="Maximize" onclick={() => paneState.maximize()}></button>
      <button aria-label="Close" onclick={() => {
        // is this the last window in the portal? if so, just close the tab
        const windowsInPortal = getOpenWindows().filter(w => w.portalId === window.portalId);
        if (windowsInPortal.length === 1) {
          confirm("This will end your session. You will need to reload the page if you continue.") && removeWindow(window.id);
        }
      }}></button>
    </div>
  </Pane.Handle>
  <Pane.Content class="window-body -w-full" style="flex-direction: column; justify-content: space-between;">
    <svelte:component this={window.component} {...window.props} />
  </Pane.Content>
</Pane.Root>

<style>
  :global(.window-body) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
