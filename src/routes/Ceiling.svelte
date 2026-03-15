<script lang=ts>
    import { animate } from "animejs";
    import { ceiling } from "./Images.ts"
    import { browser } from "$app/environment";
    export async function sleep(ms: number): Promise<void> {
        return new Promise(
        (resolve) => setTimeout(resolve, ms));
    }
    import { onMount } from "svelte";

    let ceilingDiv: HTMLDivElement;
    const { initX, initY, turn }: { initX: number, initY: number, turn: number } = $props();
    let y: number = $state(0);
    let x: number = $state(0);
    let yV: number = -10;
    onMount(() => {
        y = initY;
        x = initX;
        fall();
        animate(ceilingDiv, {
            opacity: [0.8, 0],
            rotate: [0, Math.round(turn*150)],
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

<div bind:this={ceilingDiv} style="position: fixed; top: {y}px; left: {x}px" class="opacity-0 pointer-events-none bg-[url({ceiling})] h-[40vh] w-[40vh] bg-contain -translate-1/2"></div>
    