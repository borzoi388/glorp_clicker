<script lang=ts>
    let { h } = $props();
    import * as images from "./Images.ts"
</script>

<!-- <span class="bg-[url({images.ceiling})] bg-contain bg-center bg-no-repeat text-transparent">—</span> -->
<img src={images.ceiling} class="h-[{h}rem] object-contain">
