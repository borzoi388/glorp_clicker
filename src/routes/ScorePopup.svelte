<script lang=ts>
    import { animate } from "animejs";
    export async function sleep(ms: number): Promise<void> {
        return new Promise(
        (resolve) => setTimeout(resolve, ms));
    }
    import { onMount } from "svelte";
    import CeilingPoint from "./CeilingPoint.svelte";

    let text: HTMLSpanElement;
    const { initX, initY, score, turn }: { initX: number, initY: number, score: string, turn: number } = $props();
    onMount(() => {
        animate(text, {
            opacity: [1, 0],
            translateY: [0, -50],
            ease: "in",
            duration: 500,
        })
    })

</script>

<span bind:this={text} class="text-rose-200 fixed pointer-events-none text-6xl" style="top: {initY+turn}px; left: {initX+turn}px">
    <span class="outline-shadow-sm">+{score}</span><CeilingPoint/>
</span>
    