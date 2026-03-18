<script lang=ts>
    import { animate } from "animejs";
    import CeilingPoint from "./CeilingPoint.svelte";

    let score: number = $state(0);
    let span: HTMLDivElement;
    export async function appear(num: number) {
        score = num;
        await animate(span, {
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 100,
        })
        await animate(span, {
            opacity: [1, 1],
            duration: 1000,
        })
        await animate(span, {
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 100,
        })
    }
</script>

<div bind:this={span} class="flex text-center font-[Star-Crush] text-8xl opacity-0 fixed top-1/2 left-1/2 -translate-1/2 pointer-events-none">
    <span class="outline-shadow-lg">
    {score == 0 ? "Next time!" : score > 0 ? "Ka-ching!" : "Aw dang it!"}
    {score >= 0 ? "+" : ""}{score}</span><CeilingPoint h={6}/>
    
</div>