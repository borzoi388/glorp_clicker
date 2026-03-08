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
                    name: "ceiling stickersheet",
                    icon: "src/lib/images/ceiling.png",
                    variety: "click",
                    value: 1,
                    price: 15,
                    description: ""
                }, {
                    name: "ceiling",
                    icon: "src/lib/images/ceiling.png",
                    variety: "auto",
                    value: 1,
                    price: 100,
                    description: "",
                }
            ],
            perclick: 1,
            persecond: 0,
            stickers: []
        }
	}




    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { browser } from "$app/environment";
    import { animate } from "animejs";
    import CeilingAnimations from "./CeilingAnimations.svelte";
    import CeilingPoint from "./CeilingPoint.svelte";
    import ShopItem from "./ShopItem.svelte";

    let ceilingAnimations: any;

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
        await addCPS();
    }
    
    async function start() {
        if (browser) {
            const localStoredGame = localStorage.getItem("game");
            console.log(localStoredGame)
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
        ceilingAnimations.addCeiling($game.perclick);
        animate(ceiling, {
            scale: [1.1, 1],
            duration: 75,
        })
    }

    function buyItem(item: ShopItem) {
        if (item.name == "ceiling stickersheet") {
            addSticker();
        }
        if ($game.score >= item.price) {
            $game.score-=item.price;
            item.price = Math.round(item.price*1.5);
            if (item.variety == "click") {
                $game.perclick+=item.value;
            } else if (item.variety == "auto") {
                $game.persecond+=item.value;
            }}
    }

    function clearGame() {
        $game = newGame();
        if (browser) {localStorage.removeItem("game")}

    }

    async function ceiling_spin() {
        console.log("e")
        await animate(ceiling, {
            rotate: [-20, 20],
            duration: 3000,
            ease: "inOut",
        })

        await animate(ceiling, {
            rotate: [20, -20],
            duration: 3000,
            ease: "inOut",
        })
        await ceiling_spin();
    }

    let images: string[] = [ "src/lib/images/ceiling.png" ]
    function addSticker() {
        $game.stickers.push(images[Math.floor(Math.random()*images.length)])
    }
</script>

<main class="font-[RetroByte] text-xl h-[100vh] bg-green-200 grid grid-rows-10">

    <div class="grid grid-cols-2 row-span-9 w-full bg-orange-200 content-stretch">
        <div class="col-span-1 content-space-between bg-slate-100 grid">
            <div class="bg-sky-200 bg-contain bg-center bg-no-repeat self-start w-full text-center p-4">
                <h1 class="text-8xl font-[Star-Crush] outline-shadow-lg">Ceiling Clicker</h1>
                <button onclick={clearGame}>cleargame</button>
            </div>
            <div onclick={click} class="justify-self-center bg-[url(src/lib/images/ceiling.png)] bg-cover bg-center h-[40vh] w-[40vh]" bind:this={ceiling}></div>
            
        </div>
        <div class="col-span-1 bg-purple-300 p-4 flex flex-col">


            <h1 class="font-[Star-Crush] text-6xl text-center my-3">
                <CeilingPoint/><CeilingPoint/>
                <span class="outline-shadow-sm">Shop</span>
                <CeilingPoint/><CeilingPoint/>
            </h1>
            <div class="bg-rose-100 h-64 border border-2 shadow-[2px_2px_0px_0px_var(--color-blue-800)] border-blue-800 flex-grow-1">
                {#each $game.shop as item}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <ShopItem item={item} faded={$game.score < item.price} hidden={$game.score < item.price*0.8 && $game.score < item.price-100} onclick={() => buyItem(item)}/>
                {/each}
            </div>
        </div>


    </div>
    <div class="w-full row-span-1 p-4 bg-sky-200">
        <div class="block font-[Star-Crush] text-6xl flex grid grid-cols-3">
            <div class="col-span-1">
                <span class="outline-shadow-sm">{$game.score}</span><CeilingPoint/>
            </div>
            <div class="col-span-1 text-center">
                <span class="outline-shadow-sm">{$game.persecond}</span><CeilingPoint/><span class="outline-shadow-sm">/s</span>
            </div>
            <div class="col-span-1 text-right">
                <span class="outline-shadow-sm">{$game.perclick}</span><CeilingPoint/><span class="outline-shadow-sm">/click</span>
            </div>
        </div>
    </div>

    <CeilingAnimations bind:this={ceilingAnimations}/>
    <!-- <StickerOverlay stickers={$game.stickers}/> -->
</main>