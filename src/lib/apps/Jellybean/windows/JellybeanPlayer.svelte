<script>
    import { onMount } from 'svelte';

    let ready = false;
    let error = false;

    onMount(() => {
        let attempts = 0;
        const maxAttempts = 30;

        const check = async () => {
            attempts++;
            try {
                const res = await fetch('/xpra/');
                if (res.ok) {
                    ready = true;
                } else {
                    throw new Error('Not ready');
                }
            } catch {
                if (attempts < maxAttempts) {
                    setTimeout(check, 2000);
                } else {
                    error = true;
                }
            }
        };

        check();
    });
</script>

{#if error}
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #008080; color: white;">
        <p>Failed to connect to the game server. Please try again.</p>
    </div>
{:else if ready}
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #008080; color: white;">
        <iframe
            title="TTR Game Window"
            src="/xpra/"
            allow="autoplay; encrypted-media"
            allowfullscreen
            style="width: 100%; height: 100%; border: none;"
        ></iframe>
    </div>
{:else}
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #008080; color: white;">
        <p>Waiting for game server to start...</p>
    </div>
{/if}