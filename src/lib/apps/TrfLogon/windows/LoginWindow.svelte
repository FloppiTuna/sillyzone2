<script lang="ts">
  export let onLogin: (username: string, password: string) => Promise<boolean> = async () => false;
  export let beginLoading: () => void = () => {};

  let loginUsername = '';
  let loginPassword = '';
  let isLoading = false;
  let errorMessage = '';

  async function handleLogin() {
    isLoading = true;
    errorMessage = '';
    
    try {
      const success = await onLogin(loginUsername, loginPassword);
      if (!success) {
        errorMessage = 'Login failed. Please check your credentials.';
      }
    } catch (error) {
      errorMessage = 'An error occurred during login.';
      console.error(error);
    } finally {
      isLoading = false;
    }

    if (!errorMessage) {
      beginLoading();
    }
  }
</script>

<div>
  <div class="flex items-center justify-center" style="height: 64px; width:100%; min-width: 0; box-sizing: border-box; background-color: black; text-align: center; color: white; font-size: 24px; font-weight: bold;">
    <p>paleportal <i>deluxe</i></p>
  </div>
  <p><b>This application requires you to log in. Unauthorized access is prohibited.</b></p>

  {#if errorMessage}
    <div style="color: red; margin-top: 8px; text-align: center;">
      {errorMessage}
    </div>
  {/if}
</div>

<div style="display: flex; flex-direction: row; gap: 8px; justify-content: center; align-items: center; margin-top: 16px;">
  <input
    type="text"
    placeholder="Username"
    bind:value={loginUsername}
    disabled={isLoading}
  />
  <input
    type="password"
    placeholder="Password"
    bind:value={loginPassword}
    disabled={isLoading}
  />
  <button
    onclick={handleLogin}
    disabled={isLoading}
  >
    {isLoading ? 'Logging in...' : 'Login'}
  </button>
  <button disabled>
    Register
  </button>
</div>



<style>
  :global(input) {
    padding: 4px 8px;
  }

  :global(button) {
    padding: 4px 12px;
  }
</style>
