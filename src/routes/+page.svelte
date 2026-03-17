<script lang=ts>
    async function sleep(ms: number): Promise<void> {
        return new Promise(
        (resolve) => setTimeout(resolve, ms));
    }

	function newGame(): Game {
		return { 
            score: 0,
            shop: [
                { 
                    name: "Low quality ceiling",
                    icon: "src/lib/images/ceiling5.png",
                    variety: "click",
                    value: 1,
                    price: 15,
                    description: "Is it a speck of sand? Is it a singular pixel? No... it's low quality ceiling!"
                }, {
                    name: "Deflated blahaj",
                    icon: "src/lib/images/blahaj2.png",
                    variety: "auto",
                    value: 1,
                    price: 100,
                    description: "Blahaj!! But... where is its robustness!?",
                }, {
                    name: "Low poly blahaj",
                    icon: "src/lib/images/blahaj3.png",
                    variety: "click",
                    value: 6,
                    price: 500,
                    description: "A fresh looking blahaj with a few faces",
                }, {
                    name: "Ceiling",
                    icon: "src/lib/images/ceiling.png",
                    variety: "auto",
                    value: 8,
                    price: 1500,
                    description: "6.8 ounces and full of ceiling",
                }, {
                    name: "Blahaj",
                    icon: "src/lib/images/blahaj.png",
                    variety: "click",
                    value: 24,
                    price: 4000,
                    description: "39.25 inches of pure shonk!",
                }, {
                    name: "Double ceiling",
                    icon: "src/lib/images/ceiling2.png",
                    variety: "auto",
                    value: 50,
                    price: 10000,
                    description: "Double the ceiling, double the fun!",
                }, {
                    name: "Bass ceiling",
                    icon: "src/lib/images/seal_bassist.png",
                    variety: "cpc",
                    value: 0.1,
                    price: 20000,
                    description: "A ceiling with a bass guitar",
                }, {
                    name: "Ceiling family",
                    icon: "src/lib/images/ceiling3.png",
                    variety: "auto",
                    value: 800,
                    price: 40000,
                    description: "This number of ceilings for such a low low price!? Unprecedented!",
                }, {
                    name: "High quality ceiling",
                    icon: "src/lib/images/ceiling4.png",
                    variety: "auto",
                    value: 2000,
                    price: 100000,
                    description: "This ceiling has extended beyond its dimension to something greater...?!",
                },
            ],
            perclick: 1,
            persecond: 0,
            multperclick: 1,
            highScore: 0
        }
	}




    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { browser } from "$app/environment";
    import { animate } from "animejs";
    import CeilingAnimations from "./CeilingAnimations.svelte";
    import CeilingPoint from "./CeilingPoint.svelte";
    import ShopItemComponent from "./ShopItemComponent.svelte";
    import Btn from "./Btn.svelte";
    import Slots from "./Slots.svelte";
    import * as images from "./Images.ts";

    let ceilingAnimations: any;
    let hideAnimations: boolean = $state(false);
    let gambling: boolean = $state(false);

    let subscribe: boolean = false;
    let game = $state(writable(newGame()));

    let ceilingDiv: HTMLDivElement

    onMount(() => {
        start();
        // ceiling_spin();
        addCPS()
    })

    async function addCPS() {
        await sleep(1000);
        $game.score+=$game.persecond;
        game.update(() => $game);
        await addCPS();
    }
    
    async function start() {
        if (browser) {
            const localStoredGame = localStorage.getItem("game");
            if (!localStoredGame) {
                $game = newGame() } else 
                { $game = JSON.parse(localStoredGame) }
            subscribe = true;
        }
    }
    game.subscribe(() => {
        if (browser && subscribe) {
            if ($game.score > $game.highScore) {
                $game.highScore = $game.score
            }
            localStorage.setItem("game", JSON.stringify($game))
        }
    })

    async function click() {
        animate(ceilingDiv, {
            scaleY: [1.1, 0.9, 1],
            scaleX: [0.9, 1.1, 1],
            ease: "in",
            duration: 150,
        })
        if (ceilingAnimations) {
            if ($game.multperclick > 1) {
                ceilingAnimations.addCeiling($game.score*($game.multperclick-1)+$game.perclick, false)
            } else {
                ceilingAnimations.addCeiling($game.perclick, false);
            }
        }
        $game.score+=$game.perclick;
        $game.score*=$game.multperclick;
        game.update(() => $game);
    }

    function buyItem(item: ShopItem) {
        if ($game.score >= item.price) {
            item.hasPurchased = true;
            $game.score-=item.price;
            item.price = Math.round(item.price*1.3);
            if (item.variety == "click") {
                $game.perclick+=item.value;
            } else if (item.variety == "auto") {
                $game.persecond+=item.value;
            } else if (item.variety == "cpc") {
                $game.multperclick+=(item.value/100);
            }
        }
        game.update(() => $game);
    }

    async function clearGame() {
        if (browser) { 
            $game = newGame();
            localStorage.removeItem("game"); 
            localStorage.setItem("game", JSON.stringify(newGame())); 
            $game = JSON.parse(localStorage.getItem("game"))
            game.update(() => $game);

        }
    }

    async function ceiling_spin() {
        await animate(ceilingDiv, {
            rotate: [-10, 10],
            duration: 3000,
            ease: "inOut",
        })

        await animate(ceilingDiv, {
            rotate: [10, -10],
            duration: 3000,
            ease: "inOut",
        })
        await ceiling_spin();
    }

</script>

<main class="font-[RetroByte] text-xl h-[100vh] bg-green-200 grid grid-rows-10">
    <div class="grid grid-cols-2 row-span-9 w-full bg-orange-200 content-stretch">
        <div class="col-span-1 content-space-between bg-slate-100 grid">
            <div class="bg-sky-200 bg-contain bg-center bg-no-repeat self-start w-full text-center p-4">
                <h1 class="text-8xl font-[Star-Crush] outline-shadow-lg">Ceiling Clicker</h1>
                <div class="block flex flex-wrap mt-2 justify-center">
                    <Btn bind:isChecked={hideAnimations} label="Hide Animations"/>
                    <button class="px-[8px] py-[4px] text-blue-800 bg-rose-200 border-2 border-blue-800 shadow-[2px_2px_0px_0px_var(--color-blue-800)] translate-0 active:shadow-[inset_1px_1px_0px_0px_var(--color-blue-800)] active:translate-[2px] active:p-[5px_7px_3px_9px] m-1" onclick={clearGame}>Reset Game</button>
                </div>
            </div>

            <!--CEILING-->
            <img onclick={click} src="src/lib/images/ceiling.png" class="justify-self-center object-cover object-center h-[40vh] w-[40vh]" bind:this={ceilingDiv}>
            
        </div>
        <div class="col-span-1 bg-purple-300 p-4 flex flex-col">


            <div class="text-6xl font-[Star-Crush] grid grid-cols-2 translate-[-2px]">
                <button onclick={() => gambling = false} class="{gambling ? "shadow-none translate-[2px]" : "active:translate-[2px] translate-0"} px-[8px] py-[8px] text-blue-800 bg-rose-100 border-2 border-blue-800 shadow-[2px_2px_0px_0px_var(--color-blue-800)] active:shadow-[inset_1px_1px_0px_0px_var(--color-blue-800)] active:p-[9px_7px_7px_9px]">Shop</button>
                <button onclick={() => gambling = true} class="{!gambling ? "shadow-none translate-[2px]" : "active:translate-[2px] translate-0"} px-[8px] py-[8px] text-blue-800 bg-rose-100 border-2 border-blue-800 shadow-[2px_2px_0px_0px_var(--color-blue-800)] active:shadow-[inset_1px_1px_0px_0px_var(--color-blue-800)] active:p-[9px_7px_7px_9px]">Casino</button>

            </div>
            <div class=" bg-rose-100 h-64 mt-2 border border-2 border-blue-800 flex-grow-1 overflow-scroll py-1">
                {#if (!gambling)}
                    {#each $game.shop as item}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div onclick={() => buyItem(item)} class="cursor-pointer">
                            <ShopItemComponent item={item} faded={$game.score < item.price} hidden={$game.highScore < item.price*0.4 && $game.highScore < item.price-100 && !item.hasPurchased} visible={$game.highScore > item.price*0.2 || item.hasPurchased || $game.score > item.price-101}/>
                        </div>
                    {/each}
                {:else}
                    <Slots animations={ceilingAnimations} bind:game={game}/>
                {/if}
            </div>
        </div>


    </div>
    <div class="w-full row-span-1 p-4 bg-sky-200 z-index-2 overflow-hidden">
        <div class="block font-[Star-Crush] text-6xl flex grid grid-cols-3">
            <div class="col-span-1 flex">
                <span class="outline-shadow-sm">{Math.round($game.score).toLocaleString('en-US')}</span><CeilingPoint h={3.75}/>
            </div>
            <div class="col-span-1 text-center flex">
                <span class="outline-shadow-sm">{$game.persecond.toFixed(2)}</span><CeilingPoint h={3.75}/><span class="outline-shadow-sm">/s</span>
            </div>
            <div class="col-spa<number | undefined>n-1 text-right flex">
                <span class="outline-shadow-sm">{$game.perclick.toFixed(2)}</span><CeilingPoint h={3.75}/><span class="outline-shadow-sm">/click</span>
            </div>
        </div>
    </div>

    {#if !hideAnimations}
        <CeilingAnimations bind:this={ceilingAnimations}/>
    {/if}
    <!-- <StickerOverlay stickers={$game.stickers}/> -->
</main>
<div class="lg:invisible fixed top-0 left-0 bg-sky-200 w-screen h-[100vh] flex flex-wrap justify-center content-center text-center p-2">
    <h1 class="font-[Star-Crush] outline-shadow-sm text-6xl">Doesn't work on mobile</h1>
    <div class="bg-[url(src/lib/images/ceiling.png)] bg-contain bg-no-repeat bg-center w-full h-32"></div>
    <h1 class="font-[Star-Crush] outline-shadow-sm text-6xl">come back on computer plz 👍</h1>
</div>