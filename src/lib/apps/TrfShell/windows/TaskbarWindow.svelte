<script lang="ts">
  import { sessionStore } from "$lib/stores/sessionStore";
  import Smiley from "$lib/assets/start.png";

  const session = $sessionStore;
  console.log("Session in LoadingWindow:", session);
</script>

<div class="taskbar-root">
    <button class="start-button">
      <img src={Smiley} />
      Start
    </button>
</div>

<style>
    .taskbar-root {
      align-items: center;
    }

    .start-button {
      height: 12px;
      
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .start-button img {
      height: 100%;
      
    }
</style>