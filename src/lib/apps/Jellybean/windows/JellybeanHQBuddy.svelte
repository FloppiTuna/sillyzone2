<script lang="ts">
    import { evaluateGroupName } from "../groupUtils";
    const { openGroupDetails } = $props()

    let groups: any[] = $state([]);
    let selectedGroup: any = $state(null);



    setInterval(async () => {
        try {
            const response = await fetch("/api/games/toonhq/groups");
            if (!response.ok) throw new Error("Network response was not ok");
            const parsed = await response.json();
            groups = parsed.groups ?? [];
        } catch (error) {
            console.error("ToonHQ communication error!", error);
        }
    }, 2000);
</script>

<div style="height: 100%; display: flex; flex-direction: column;">
    <div class="sunken-panel">
        <table class="interactive" style="table-layout: fixed; width: 100%;">
            <thead>
                <tr>
                    <th style="width: 75%">Group Type</th>
                    <th style="width: 25%">Toons</th>
                </tr>
            </thead>
            <tbody>
                {#if groups.length > 0}
                    {#each groups as group}
                        <tr class:unavailable-group={!group.boarding} onclick={() => {
                            selectedGroup = group;
                        }}>
                            <td>{evaluateGroupName(group)}</td>
                            <td>{group.members.length}/{group.max_players}</td>
                        </tr>
                    {/each}
                {:else}
                    <tr>
                        <td colspan="2" style="background-color: lightgray;">Waiting for ToonHQ to respond...</td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
</div>

<div
    style="display: flex; flex-direction: row; gap: 8px; justify-content: flex-end; align-items: center; margin-top: 16px;"
>
    <div style="display: flex; flex-direction: row; gap: 8px;">
        <button onclick={() => {
            openGroupDetails(selectedGroup);
        }}> More Info... </button>
        <button> Join </button>
    </div>
</div>

<style>
    .unavailable-group {
        background-color: lightgray;
        font-style: italic;
    }
</style>
