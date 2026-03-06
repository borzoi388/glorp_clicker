<script lang=ts>

	function newGame(): Game {
		return { 
            score: 0,
            shop: [
                { 
                    name: "+1 on click",
                    icon: "src/lib/images/ceiling.png",
                    variety: "click",
                    value: 1,
                    price: 15,
                }, {
                    name: "+1 per second",
                    icon: "src/lib/images/ceiling.png",
                    variety: "auto",
                    value: 1,
                    price: 100,
                }
            ],
            perclick: 1,
            persecond: 0,
        }
	}




    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { browser } from "$app/environment";
    import { animate } from "animejs";

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
        let nextTime = new Date().getTime()
        $game.score+=$game.persecond;
        await addCPS();
    }
    
    async function start() {
        if (browser) {
            console.log("start")
            const localStoredGame = localStorage.getItem("game");
            console.log(localStoredGame)
            if (!localStoredGame) {
                $game = newGame(); console.log("no geame") } else 
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
        animate(ceiling, {
            scale: [1.1, 1],
            duration: 75,
        })
    }

    function buyItem(item: ShopItem) {
        if ($game.score >= item.price) {
            $game.score-=item.price;
            item.price = Math.round(item.price*1.8);
            if (item.variety == "click") {
                $game.perclick+=item.value;
            } else if (item.variety == "auto") {
                $game.persecond+=item.value;
            }}
    }

    // async function ceiling_spin() {
    //     console.log("e")
    //     await animate(ceiling, {
    //         rotate: [-20, 20],
    //         duration: 3000,
    //         ease: "inOut",
    //     })

    //     await animate(ceiling, {
    //         rotate: [20, -20],
    //         duration: 3000,
    //         ease: "inOut",
    //     })
    //     await ceiling_spin();
    // }
</script>

<div class="fixed top-0px left-0px">
    {$game.score}
</div>

<div class="grid grid-cols-2 size-full bg-orange-200">
    <div class="col-span-1 justify-center items-center bg-red-200 flex flex-wrap">
        <div class="bg-[url(src/lib/images/title.gif)] bg-contain bg-center bg-no-repeat w-full h-32"></div>
        <div onclick={click} class="bg-[url(src/lib/images/ceiling.png)] bg-cover bg-center h-80 w-80" bind:this={ceiling}></div>
    </div>
    <div class="col-span-1 bg-slate-200">
        {#each $game.shop as item}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div onclick={() => buyItem(item)} class="w-full p-2 bg-rose-200 {item.price > $game.score ? "opacity-50" : ""}">
                {item.name} - costs {item.price} ceilings - increases ceilings per {item.variety == "auto" ? "second" : "click"} by {item.value}
            </div>
        {/each}
    </div>
</div>