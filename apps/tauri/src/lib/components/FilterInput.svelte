<script lang="ts">
  export let filter: string;
</script>

<!-- svelte-ignore a11y-autofocus -->
<div class="px-20">
  <input
    bind:value={filter}
    type="text"
    placeholder="Filter"
    class="min-w-full input input-bordered focus:border-none input-primary placeholder:opacity-50"
    autofocus />
</div>
