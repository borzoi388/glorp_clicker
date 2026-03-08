<script lang=ts>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    export async function sleep(ms: number): Promise<void> {
        return new Promise(
        (resolve) => setTimeout(resolve, ms));
    }
    import Ceiling from "./Ceiling.svelte";
    import ScorePopup from "./ScorePopup.svelte";
    let ceilings: Array<{score: number, top: number, left: number, turn: number}> = $state([])
    let numAnimating: number = 0;
    let mousePos: {x: number, y: number} = $state({x: 0, y: 0})
    onMount(() => {
        if (browser) {
            window.addEventListener('mousemove', updatePos)
        }
    })

    function updatePos(mouse: any) {
        mousePos = {x: mouse.clientX, y: mouse.clientY};
    }
    
    export async function addCeiling(score: number) {
        numAnimating++;
        ceilings.push({
            score: score,
            top: mousePos.y,
            left: mousePos.x,
            turn: Math.random()-0.5,
        })
        await sleep(1000);
        numAnimating--;
        if (numAnimating == 0) {
            ceilings = [];
        }
    }
</script>

{#each ceilings as ceiling}
    <Ceiling initX={ceiling.left} initY={ceiling.top} turn={ceiling.turn}/>
{/each}
{#each ceilings as ceiling}
    <ScorePopup score={ceiling.score.toFixed(2)} initX={ceiling.left} initY={ceiling.top} turn={ceiling.turn*10}/>
{/each}
