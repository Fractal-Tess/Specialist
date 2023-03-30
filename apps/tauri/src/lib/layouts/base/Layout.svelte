<script lang="ts">
  import { fade } from 'svelte/transition';

  import BaseHeader from './Header.svelte';
  import BaseFooter from './Footer.svelte';
</script>

<div
  class="flex h-screen flex-col overflow-y-auto overflow-x-hidden 
  bg-base-100 text-base-content"
>
  <BaseHeader />
  <main class="flex-1" in:fade={{ delay: 300, duration: 1000 }}>
    <slot />
  </main>
  <BaseFooter />
</div>
