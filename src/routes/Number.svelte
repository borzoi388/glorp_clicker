<script lang=ts>
    import * as images from "./Images.ts"
    let { size, value }: { size: boolean, value: number | string } = $props()
</script>


<div class="{size ? "h-20" : "h-12"} grid justify-center items-center text-center">
    {#if (typeof value == typeof 0)}
            <span class="{size ? "outline-shadow-sm text-[3.75rem]" : "text-[2.25rem]"} font-[Star-Crush] text-blue-800 m-0">{value}</span>
    {:else}
        <img src={value == 'ceiling' ? images.ceiling : images.blahaj} class="{size ? "h-20" : "h-12"} block object-center object-contain object-no-repeat">
    {/if}
</div>