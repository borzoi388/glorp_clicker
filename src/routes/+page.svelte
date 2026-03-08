<script lang=ts>
    export async function sleep(ms: number): Promise<void> {
        return new Promise(
        (resolve) => setTimeout(resolve, ms));
    }
	function newGame(): Game {
		return { 
            score: 0,
            shop: [
                { 
                    name: "smalling",
                    icon: "src/lib/images/ceiling.png",
                    variety: "click",
                    value: 1,
                    price: 15,
                    description: "33cm ceiling creature"
                }, {
                    name: "smolhaj",
                    icon: "src/lib/images/blahaj.png",
                    variety: "auto",
                    value: 1,
                    price: 100,
                    description: "high quality ikea shark!!!",
                }, {
                    name: "medium ceiling",
                    icon: "src/lib/images/ceiling.png",
                    variety: "click",
                    value: 4,
                    price: 500,
                    description: "44cm plush ceiling",
                }, {
                    name: "blahaj",
                    icon: "src/lib/images/blahaj.png",
                    variety: "auto",
                    value: 5,
                    price: 2000,
                    description: "BIG shonk!",
                }, {
                    name: "big ceiling",
                    icon: "src/lib/images/ceiling.png",
                    variety: "cpc",
                    value: 1,
                    price: 6000,
                    description: "the larges ceiling ever!!",
                }, 
            ],
            perclick: 1,
            persecond: 0,
            multperclick: 1
        }
	}




    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { browser } from "$app/environment";
    import { animate } from "animejs";
    import CeilingAnimations from "./CeilingAnimations.svelte";
    import CeilingPoint from "./CeilingPoint.svelte";
    import ShopItemComponent from "./ShopItemComponent.svelte";

    let ceilingAnimations: any;
    let showAnimations: boolean = $state(true);

    let subscribe: boolean = false;
    let game = $state(writable(newGame()));

    let ceiling: HTMLDivElement

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
            localStorage.setItem("game", JSON.stringify($game))
        }
    })

    async function click() {
        $game.score+=$game.perclick;
        $game.score*=$game.multperclick;
        game.update(() => $game);
        ceilingAnimations.addCeiling($game.perclick);
        animate(ceiling, {
            scaleY: [1.1, 0.9, 1],
            scaleX: [0.9, 1.1, 1],
            duration: 200,
        })
    }

    function buyItem(item: ShopItem) {
        if ($game.score >= item.price) {
            item.hasPurchased = true;
            $game.score-=item.price;
            item.price = Math.round(item.price*1.5);
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
            console.log($game)

        }
    }

    async function ceiling_spin() {
        console.log("e")
        await animate(ceiling, {
            rotate: [-10, 10],
            duration: 3000,
            ease: "inOut",
        })

        await animate(ceiling, {
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
                    <button class="px-2 py-1 text-blue-800 bg-rose-200 border-2 border-blue-800 shadow-[2px_2px_0px_0px_var(--color-blue-800)] active:bg-rose-300" onclick={clearGame}>Clear Game</button>
                </div>
            </div>

            <!--CEILING-->
            <div onclick={click} class="justify-self-center bg-[url(src/lib/images/ceiling.png)] bg-cover bg-center h-[40vh] w-[40vh]" bind:this={ceiling}></div>
            
        </div>
        <div class="col-span-1 bg-purple-300 p-4 flex flex-col">


            <h1 class="font-[Star-Crush] text-6xl text-center my-3 text-blue-800">
                Shop
            </h1>
            <div class="bg-rose-200 h-64 border border-2 shadow-[2px_2px_0px_0px_var(--color-blue-800)] border-blue-800 flex-grow-1 overflow-scroll py-1">
                {#each $game.shop as item}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                     <div onclick={() => buyItem(item)} class="cursor-pointer">
                        <ShopItemComponent item={item} faded={$game.score < item.price} hidden={$game.score < item.price*0.8 && $game.score < item.price-100 && !item.hasPurchased}/>
                    </div>
                {/each}
            </div>
        </div>


    </div>
    <div class="w-full row-span-1 p-4 bg-sky-200 z-index-2">
        <div class="block font-[Star-Crush] text-6xl flex grid grid-cols-3">
            <div class="col-span-1">
                <span class="outline-shadow-sm">{$game.score.toFixed(0)}</span><CeilingPoint/>
            </div>
            <div class="col-span-1 text-center">
                <span class="outline-shadow-sm">{$game.persecond.toFixed(2)}</span><CeilingPoint/><span class="outline-shadow-sm">/s</span>
            </div>
            <div class="col-span-1 text-right">
                <span class="outline-shadow-sm">{$game.perclick.toFixed(2)}</span><CeilingPoint/><span class="outline-shadow-sm">/click</span>
            </div>
        </div>
    </div>

    {#if showAnimations}
        <CeilingAnimations bind:this={ceilingAnimations}/>
    {/if}
    <!-- <StickerOverlay stickers={$game.stickers}/> -->
</main>
<div class="lg:invisible fixed top-0 left-0 bg-sky-200 w-screen h-[100vh] flex flex-wrap justify-center content-center text-center p-2">
    <h1 class="font-[Star-Crush] outline-shadow-sm text-6xl">Doesn't work on mobile</h1>
    <div class="bg-[url(src/lib/images/ceiling.png)] bg-contain bg-no-repeat bg-center w-full h-32"></div>
    <h1 class="font-[Star-Crush] outline-shadow-sm text-6xl">come back on computer plz 👍</h1>
</div>