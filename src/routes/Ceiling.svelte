<script lang=ts>
    import { animate } from "animejs";
    import { browser } from "$app/environment";
    export async function sleep(ms: number): Promise<void> {
        return new Promise(
        (resolve) => setTimeout(resolve, ms));
    }
    import { onMount } from "svelte";

    let ceiling: HTMLDivElement;
    const { initX, initY, turn }: { initX: number, initY: number, turn: number } = $props();
    let y: number = $state(0);
    let x: number = $state(0);
    let yV: number = -10;
    onMount(() => {
        y = initY;
        x = initX;
        fall();
        animate(ceiling, {
            opacity: [1, 0],
            rotate: [0, Math.round(turn*100)],
            ease: "in",
            duration: 500,
        })
    })

    async function fall() {
        if (browser && y < window.innerHeight) {
            yV+=1;
            x+=turn*10;
            y+=yV;
            await sleep(10);
            fall();
        }
    }
</script>

<div bind:this={ceiling} style="position: fixed; top: {y}px; left: {x}px" class="opacity-0 pointer-events-none bg-[url(src/lib/images/ceiling.png)] h-[40vh] w-[40vh] bg-contain -translate-1/2"></div>
    