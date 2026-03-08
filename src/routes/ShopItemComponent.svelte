<script>
    import CeilingPoint from "./CeilingPoint.svelte";
    const {item, faded, hidden} = $props()
</script>

<div class="w-full p-2 text-blue-800 px-2 py-1 cursor-pointer">
    <div class="flex items-stretch border-5 border-double border-slate-100 {faded ? "opacity-70" : ""} {!faded ? "hover:shadow-[0px_0px_5px_0px_var(--color-slate-100),inset_0px_0px_5px_0px_var(--color-slate-100)]" : ""} py-2">
        <div class="w-28 mr-2 bg-contain bg-center bg-no-repeat px-2 border-r-2 border-blue-800">
            {#if !hidden}
                <img src={item.icon} class="size-full object-contain hover:scale-110 transition duration-50">
            {:else}
                <div class="bg-blue-800 size-full hover:scale-110 transition duration-50" style="mask-image: url({item.icon}); mask-size: contain"></div>
            {/if}
        </div>
        <div>
            <h1 class="text-4xl {!hidden ? "font-[Star-Crush]" : 'font-[RetroByte]'}">{!hidden ? item.name : '???'}</h1>
            <span class="block">{!hidden ? item.description : '???'}</span>
            <span class="text-md">
                cost: {!hidden ?  item.price : '???'}<CeilingPoint/>
                {#if (item.variety == "cpc")}
                    | +{!hidden ? item.value : "???"}% <CeilingPoint/> per click on click
                {:else}
                    | +{!hidden ? item.value : "???"}<CeilingPoint/> per {item.variety == "auto" ? "second" : "click"}
                {/if}
            </span>
        </div>
    </div>
</div>