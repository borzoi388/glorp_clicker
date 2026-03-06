<script lang=ts>
    import { onMount } from "svelte";
    const { initX, initY, score } = $props();
    let y: number = $state(0);
    let yV: number = 0;
    onMount(() => {
        y = initY;
    })

    async function fall() {
        yV++;
        y+=yV;
        await sleep(10);
        fall();
    }
</script>

<div class="bg-[url(src/lib/images/ceiling.png)] h-80 w-80 bg-contain fixed top-{y} left-{initX}"></div>