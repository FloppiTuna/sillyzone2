<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PanekitProvider } from 'panekit';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<PanekitProvider>
	{@render children()}
</PanekitProvider>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>