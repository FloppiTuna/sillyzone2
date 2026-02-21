<script lang="ts">
  export let beginLoading: () => void;

  import { sessionStore } from "$lib/stores/sessionStore";

  const session = $sessionStore;

  beginLoading();
</script>

<div>
    <div class="flex items-center" style="height: 64px; width:100%; min-width: 0; box-sizing: border-box; background-color: black; text-align: center; color: white; font-size: 24px; font-weight: bold; justify-content: space-between; padding: 16px;">
        <p>{session.user.username}</p>
        <img src={session.user.profilePictureUrl} alt="User Avatar" style="width: 48px; height: 48px;" />
    </div>
    <div class="gradient"></div>

    <p><b>Loading your preferences...</b></p>
</div>

<style>
    @keyframes gradient-animation {
      from {
        background-position: 100% 0%;
      }
      to {
        background-position: 0% 0%;
      }
    }

    .gradient{
      background: repeating-linear-gradient(90deg, 
      #013755  0%, #9ec0da 25%,  #013755 50%);
      background-size: 200%;
      background-position: 100% 0%;
      
      animation-name: gradient-animation;
      animation-duration: 1.3s;
      animation-iteration-count: infinite;
      animation-fill-mode: forwards;
      animation-timing-function: linear;
      
      height: 6px;
    }

</style>