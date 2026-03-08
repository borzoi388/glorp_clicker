<script>
    import CeilingPoint from "./CeilingPoint.svelte";
    const {item, faded, hidden} = $props()
</script>

<div class="w-full p-2 bg-rose-200 text-blue-800 {faded ? "opacity-50" : ""} flex items-stretch">
    <div class="w-24 mr-2 bg-contain bg-center bg-no-repeat p-2 border-r-2 border-blue-800">
        <img src={item.icon} class="size-full object-contain">
    </div>
    <div>
        <h1 class="text-4xl font-[Star-Crush]">{!hidden ? item.name : '???'}</h1>
        <span class="block">{!hidden ? item.description : '???'}</span>
        <span class="text-md">
            cost: {item.price}<CeilingPoint/> | increases <CeilingPoint/> per {item.variety == "auto" ? "second" : "click"} by {item.value}
        </span>
    </div>
</div>