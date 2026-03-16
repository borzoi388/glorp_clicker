<script lang=ts>
    let { isChecked = $bindable(), label, classes }: { isChecked: any, label: string, classes: string | undefined } = $props()

</script>

<button onclick={() => isChecked = !isChecked} class="{isChecked ? "shadow-none translate-[2px]" : "active:translate-[2px] translate-0"} px-[8px] py-[4px] text-blue-800 bg-rose-200 border-2 border-blue-800 shadow-[2px_2px_0px_0px_var(--color-blue-800)] active:shadow-[inset_1px_1px_0px_0px_var(--color-blue-800)] active:p-[5px_7px_3px_9px] m-1 {classes}">
    {label}
</button>