<script lang="ts">
  import { sessionStore } from "$lib/stores/sessionStore";

  const session = $sessionStore;
  console.log("Session in LoadingWindow:", session);
</script>

<div>
    <p>yay</p>
</div>