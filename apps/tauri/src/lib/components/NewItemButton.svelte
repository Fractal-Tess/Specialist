<script lang="ts">
  import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  export let onClick: () => void;
</script>

<button
  on:click={onClick}
  class="absolute bottom-4 right-4 text-primary hover:scale-125 duration-300 transition-transform">
  <Fa icon={faPlusCircle} size={'3x'} />
</button>
