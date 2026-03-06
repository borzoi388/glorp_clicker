<script lang=ts>
    import Ceiling from "./Ceiling.svelte";
    let ceilings: Array<{score: number, top: number, left: number}> = $state([])
</script>

{#each ceilings as ceiling}
    <Ceiling score={ceiling.score} initX={ceiling.left} initY={ceiling.top}/>
{/each}
