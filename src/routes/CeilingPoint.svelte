<script lang=ts>
    let { h = 1.75 } = $props();
    import * as images from "./Images.ts"
</script>

<!-- <span class="bg-[url({images.ceiling})] bg-contain bg-center bg-no-repeat text-transparent">—</span> -->
<img src="src/lib/images/ceiling.png" style="height: {h}rem" class="object-contain">
