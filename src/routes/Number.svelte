<script lang=ts>
    let { size, value }: { size: boolean, value: number | string } = $props()
</script>

{#if (typeof value == typeof 0)}
    <span class="{size ? "outline-shadow-sm text-6xl" : "text-4xl"} font-[Star-Crush] text-blue-800 block">{value}</span>
{:else}
    <span class="{size ? "text-6xl" : "text-4xl"} bg-[url(src/lib/images/{value}.png)] bg-center bg-contain text-transparent bg-no-repeat">—</span>
{/if}