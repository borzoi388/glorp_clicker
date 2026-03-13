<script lang=ts>
    import CeilingPoint from "./CeilingPoint.svelte";
    const {item, faded, hidden, visible} = $props()
    async function sleep(ms: number): Promise<void> {
        return new Promise(
        (resolve) => setTimeout(resolve, ms));
    }
    let isPressed: boolean = $state(false);
    let div: HTMLDivElement
    async function buy() {
        if (!faded) {
            isPressed = true;
            await sleep(100);
            isPressed = false;
        }

    }
</script>

{#if visible}
    <div class="w-full p-2 text-blue-800 px-2 py-1">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div onclick={buy} class="flex items-stretch border border-2 border-blue-800 {!faded ? "-translate-[2px] shadow-[2px_2px_0px_0px_var(--color-blue-800)] bg-rose-200" : "bg-rose-200/50"} {isPressed ? "shadow-[inset_1px_1px_0px_0px_var(--color-blue-800)] translate-0 p-[5px_1px_3px_1px]" : "py-[4px]"}">
            <div class="w-28 mr-2 bg-contain bg-center bg-no-repeat px-2 border-r-2 border-blue-800">
                {#if !hidden}
                    <img src={item.icon} class="size-full object-center object-contain hover:scale-110 transition duration-50">
                {:else}
                    <div class="bg-blue-800 size-full hover:scale-110 transition duration-50" style="mask-image: url({item.icon}); mask-size: contain; mask-repeat: no-repeat; mask-position: center"></div>
                {/if}
            </div>
            <div>
                <h1 class="text-4xl {!hidden ? "font-[Star-Crush]" : 'font-[RetroByte]'}">{!hidden ? item.name : '???'}</h1>
                <span class="block">{!hidden ? item.description : '???'}</span>
                <span class="text-md">
                    cost: {!hidden ?  item.price : '???'}<CeilingPoint/>
                    {#if (item.variety == "cpc")}
                        | +{!hidden ? item.value : "???"}% <CeilingPoint/> on click 
                    {:else}
                        | +{!hidden ? item.value : "???"}<CeilingPoint/> per {item.variety == "auto" ? "second" : "click"}
                    {/if}
                </span>
            </div>
        </div>
    </div>
{/if}