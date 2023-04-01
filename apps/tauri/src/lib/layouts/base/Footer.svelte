<script lang="ts">
  import { user } from '$lib/stores/user';
  import {
    faImage,
    faMusic,
    faUserCircle
  } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { link, location } from 'svelte-spa-router';
  $: console.log($location);
</script>

<footer class="btm-nav relative">
  <a
    use:link
    class:active={$location.startsWith('/#content/audios')}
    href="/#content/audios"
    class="text-primary">
    <Fa icon={faMusic} />
  </a>
  <a
    use:link
    class:active={$location.startsWith('/#content/images')}
    href="/#content/images"
    class="text-primary active">
    <Fa icon={faImage} />
  </a>
  <a
    use:link
    class:active={$location.startsWith('/#settings')}
    href="/#settings"
    class="text-primary">
    {#if $user}
      <img
        src={$user.avatarUrl}
        alt="Avatar"
        class="max-h-full rounded-full p-2" />
    {:else}
      <Fa icon={faUserCircle} />
    {/if}
  </a>
</footer>
