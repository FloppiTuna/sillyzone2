<script lang="ts">
  import { onMount } from "svelte";
  import { Pane, PaneState } from "panekit";
  import type { OpenWindow } from "$lib/stores/windowStore";
  import { removeWindow, getOpenWindows } from "$lib/stores/windowStore";

  export let pane: OpenWindow;

  const initialWidth = pane.size.width === "full" ? 0 : pane.size.width;
  const initialHeight = pane.size.height === "full" ? 0 : pane.size.height;

  let paneState = new PaneState({
    size: {
      width: initialWidth,
      height: initialHeight + (pane.menuItems ? 20 : 0), // if there are menu items, we need to add some height to account for the menu bar
    },
    constrainToPortal: pane.constrainToPortal ?? true,
    portalId: pane.portalId ?? "main-panel",
    canDrag: pane.renderTitlebar !== false, // todo: perhaps there should be a literal "can i drag this window" property or some way to provide a custom window component entirely? idk
  });

  onMount(() => {
    if (pane.size.width === "full" || pane.size.height === "full") {
      paneState.size = {
        width: pane.size.width === "full" ? window.innerWidth : pane.size.width,
        height:
          pane.size.height === "full" ? window.innerHeight : pane.size.height,
      };
    }
  });

  pane.paneState = paneState;
</script>

<Pane.Root {paneState} id="window-{pane.id}" class="window">
  {#if pane.renderTitlebar !== false}
    <Pane.Handle class="flex title-bar">
      <div class="title-bar-text">{pane.title}</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize" onclick={() => paneState.minimize()}
        ></button>
        <!-- this doesnt do anything lol -->
        <button aria-label="Maximize" onclick={() => paneState.maximize()}
        ></button>
        <button
          aria-label="Close"
          onclick={() => {
            // is this the last window in the portal? if so, just close the tab
            const windowsInPortal = getOpenWindows().filter(
              (w) => w.portalId === pane.portalId,
            );
            if (windowsInPortal.length === 1) {
              confirm(
                "This will end your session. You will need to reload the page if you continue.",
              ) && removeWindow(pane.id);
            }

            removeWindow(pane.id);
          }}
        ></button>
      </div>
    </Pane.Handle>
  {/if}
  {#if pane.menuItems}
    <div class="menu-bar">
      {#each pane.menuItems as item}
        <div class="menu-bar-item" onclick={item.action}>
          <button aria-label={item.label}><u>{item.label.charAt(0)}</u>{item.label.slice(1)}</button>
        </div>
      {/each}
    </div>
  {/if}

  <Pane.Content
    class={"-w-full" + (pane.useDefaultMargins === false ? "" : " window-body")}
    style="flex-direction: column; justify-content: space-between;"
  >
    <svelte:component this={pane.component} {...pane.props} />
  </Pane.Content>
</Pane.Root>

<style>
  :global(.window-body) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
