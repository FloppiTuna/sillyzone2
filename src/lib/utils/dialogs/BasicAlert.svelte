<script lang="ts">
    const { message, options, onAnswered } = $props()
</script>

<div style="display: flex; height: 100%; width: 100%;">
    <p>{message}</p>
</div>

<div style="display: flex; flex-direction: row; gap: 8px; justify-content: flex-end;">
    {#each options as option}
        <button onclick={() => onAnswered(option)}>{option}</button>
    {/each}
</div>

<style>

</style>