<script>
    import { evaluateGags, evaluateGroupName } from "../groupUtils";
    const { group } = $props();




</script>

<div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
    <p class="group-title">{evaluateGroupName(group)}</p>

    {#if group.note}
        <p class="group-note">{group.note}</p>
    {/if}

    <div class="sunken-panel" style="">
        <table class="interactive" style="table-layout: fixed; width: 100%;">
            <thead>
                <tr>
                    <th>Toon</th>
                    <th>Gags</th>
                    <th>Laff</th>
                </tr>
            </thead>
            <tbody>
                {#each group.members as member}
                    <tr>
                        <td>{member.toon.name}</td>
                        <td>{evaluateGags(member.toon)}</td>
                        <td>{member.toon.laff}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <!-- <div style="flex-grow: 1;"></div> -->
</div>

<style>
    .group-title {
        font-size: 24px;
        font-weight: bold;
    }
</style>
