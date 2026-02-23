<script lang="ts">
    export let onSelect: (option: string) => void = () => {};

</script>

<div>
    <div
        class="flex items-center justify-center"
        style="height: 64px; width:100%; min-width: 0; box-sizing: border-box; background-color: black; text-align: center; color: white; font-size: 24px; font-weight: bold;"
    >
        <p>toontown</p>
    </div>
</div>

<div
    style="display: flex; flex-direction: row; gap: 8px; justify-content: space-between; align-items: center; margin-top: 16px;"
>
    <select>
        <option>ToonTown Rewritten</option>
    </select>

    <!-- why is this app coded so horribly crying -->
    <div style="display: flex; flex-direction: row; gap: 8px;">
        <button> Manage Credentials... </button>
        <button onclick={() => onSelect("ToonTown Rewritten")}> Launch </button>
    </div>
</div>
