<script lang="ts">
  import { sessionStore } from "$lib/stores/sessionStore";
  import { openWindows } from "$lib/stores/windowStore";
  import Smiley from "$lib/assets/start.png";
    import { executeApp } from "$lib/stores/appManagerStore";

  const session = $sessionStore;
  console.log("Session in LoadingWindow:", session);

  // clock
  let time = "0:00 PM";
  let blink = true;
  function updateTime() {
    time = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    // blink the colon every second
    if (blink) {
      time = time.replace(":", " ");
    }
    blink = !blink;
  }
  setInterval(updateTime, 1000);

</script>

<div class="taskbar-root">
  <div class="start-cluster">
    <button class="start-button" onclick={() => {
      executeApp('veeterm');
    }}>
      <img src={Smiley} alt="" />
      Start
    </button>

    <div class="field-border-disabled">
      <div>
        <span>pinned items</span>
      </div>
    </div>
  </div>

  <div class="window-list">
    {#each $openWindows as window (window.id)}
      <button>
        <span>{window.title}</span>
      </button>
    {/each}
  </div>


  <div class="status-field-border">
    <div class="time-display">
      <span>{time}</span>
    </div>
  </div>
</div>

<style>
  .taskbar-root {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 4px;
    margin-right: 4px;
    justify-content: space-between;
  }

  .start-cluster {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .start-button {
    height: 12px;
    min-width: none;
    max-width: 48px;
    width: 12px;
    display: flex;
    justify-content: space-between;
  }

  .start-button img {
    height: 100%;
  }

  .time-display {
    font-size: 12px;
    color: black;
    padding: 2px;
    font-weight: bold;
  }
</style>
