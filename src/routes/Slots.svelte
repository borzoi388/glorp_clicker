<script lang=ts>
    import { onMount } from "svelte";
    import Number from "./Number.svelte";
    import GambleScore from "./GambleScore.svelte";
    import Btn from "./Btn.svelte";
    import { writable } from "svelte/store";

    async function sleep(ms: number): Promise<void> {
        return new Promise(
        (resolve) => setTimeout(resolve, ms));
    }
    let popup: GambleScore;
    let showPrizes: boolean = $state(false)
    let { game = $bindable() } = $props();
    let isBetting: boolean = $state(false)
    let bettingAll = $state(writable<boolean>(false))

    let nums: Array<Array<number | string>> = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ]
    onMount(() => {
        for (let i = 0; i < 3; i++) {
            nums[i].splice(Math.floor(Math.random()*nums[i].length), 0, "ceiling");
            nums[i].splice(Math.floor(Math.random()*nums[i].length), 0, "blahaj");
        }
    })

    let slots: Array<{prev: number | string, curr: number | string, next: number | string}> = $state([
        {prev: 6, curr: 7, next: 8},
        {prev: 6, curr: 7, next: 8},
        {prev: 6, curr: 7, next: 8},
    ])

    game.subscribe((value: any) => {
        if ($bettingAll) {
            bet = $game.score
        }
    })

    bettingAll.subscribe((value) => {
        console.log(Math.random())
        game.update(() => $game);
    })

    let bet = $state();

    function checkBet() {
        if (bet) {
            if (bet > $game.score) {
                bet = Math.floor($game.score);
            } else if (bet < 1) {
                bet = 1;
            }
        }
    }

    async function spinCol(col: number, ms: number) {
        if (bet != null && (!isBetting || col > 0 || ms > 25)) {
            isBetting = true;
            await sleep(ms);
            await setSlot(col);
            if (ms == 100 && col < 2) {
                spinCol(col+1, 25);
            }
            if (ms < 300) {
                spinCol(col, ms+25);
            } else if (col == 2) {
                await sleep(20)
                addBet([slots[0].curr, slots[1].curr, slots[2].curr])
            }
        }
    }

    //Evil ahh function
    function addBet(thingy: Array<number | string>) {
        let map: Map<number | string, number> = new Map();
        let mult: number = -1;
        for (let i = 0; i < 3; i++) {
            if (map.has(thingy[i])) {
                map.set(thingy[i], map.get(thingy[i])+1)
            } else {
                map.set(thingy[i], 1);
            }
        }
        if (map.size == 3) {
            if (map.has("ceiling")&&map.has("blahaj")) {
                mult = 3;
            } else if (map.has("ceiling")||map.has("blahaj")) {
                mult = 0;
            }
        } else if (map.size == 2) {
            if (map.has("ceiling") && map.has("blahaj")) {
                mult = 25;
            } else if (map.has("ceiling") || map.has("blahaj")) {
                for (var thing of ["ceiling", "blahaj"]) {
                    if (map.has(thing) && map.get(thing) == 2) {
                        mult = 3; 
                    }
                }
            }
            if (mult < 1) {
                mult = 2;
            }
        } else if (map.size == 1) {
            if (map.has("ceiling") || map.has("blahaj")) {
                mult = 25;
            } else { mult = 4 }
        }
        popup.appear(bet*mult);
        $game.score += bet*mult;
        checkBet();
        isBetting = false;
    }

    async function setSlot(col: number) {
        let curr = Math.floor(Math.random()*nums[col].length)
        slots[col].curr = nums[col][curr];
        if (curr == 0) { slots[col].prev = nums[col][nums.length-1] } else { slots[col].prev = nums[col][curr-1] }
        if (curr == nums[col].length-1) { slots[col].next = nums[col][0]; } else { slots[col].next = nums[col][curr+1] }
    }
</script>

<center>
    <Btn label="Show prizes" bind:isChecked={showPrizes} classes="m-0 mt-2"/>
</center>
<div class="flex justify-center items-start p-3">
    <center class="w-1/2 mr-3">
        <div class="grid grid-cols-3 border border-blue-800 bg-slate-100">
            {#each slots as slot}
                <div class="col-span-1 border border-blue-800 p-2 text-center">
                    <Number size={false} value={slot.prev}/>
                    <Number size={true} value={slot.curr}/>
                    <Number size={false} value={slot.next}/>
                </div>
            {/each}
        </div>

        <div class="my-3 bg-slate-100 border border-2 border-blue-800 text-center p-2">
            <label class="text-4xl text-blue-800 font-[Star-Crush]">
                Bet
                <input type="number" onchange={checkBet} bind:value={bet} class="focus:ring-0 focus:border-none focus:outline-none text-4xl outline-none block w-full p-0 border-none bg-transparent">
            </label>
        </div>
        <div class="grid grid-cols-2 text-4xl">
            <Btn label="Bet all" bind:isChecked={$bettingAll} classes="col-span-1 font-[Star-Crush] m-[0px_0px_0px_0px]"/>
            <button onclick={() => spinCol(0, 25)} class="col-span-1 {bet == null || isBetting ? "translate-[2px] text-blue-800/80" : "text-blue-800 shadow-[2px_2px_0px_0px_var(--color-blue-800)] active:shadow-[inset_1px_1px_0px_0px_var(--color-blue-800)] active:translate-[2px] active:p-[9px_15px_7px_17px]"} px-[16px] py-[8px] font-[Star-Crush] bg-rose-200 border-2 border-blue-800 translate-0">Bet</button>
        </div>
    </center>
    {#if showPrizes}
        <div class="w-1/2 bg-slate-100 border border-2 border-blue-800 p-2 text-blue-800">
            No matches: lose your bet <br>
            Two of any number: 2x your bet <br>
            Three of any number: 4x your bet <br>
            One of any special: keep your bet <br>
            Two of any special: 3x your bet <br>
            Three of any special: 25x your bet <br>
            Three ceilings: 100x your bet <br>
        </div>
    {/if}
    <GambleScore bind:this={popup}/>
</div>