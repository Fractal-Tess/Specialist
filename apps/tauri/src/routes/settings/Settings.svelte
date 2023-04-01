<script lang="ts">
  import { servers } from '$lib/stores/servers';
  import { user } from '$lib/stores/user';
  import { faServer, faUserCircle } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { link } from 'svelte-spa-router';
</script>

<main
  class="w-full h-full bg-base-100 flex items-center justify-center flex-col gap-y-32 relative"
>
  <a
    href="/#settings/profile"
    use:link
    class="flex flex-col gap-y-4 capitalize w-80 text-3xl rounded-md font-extrabold btn btn-primary"
  >
    {#if $user}
      <img class="rounded-3xl" src={$user.avatarUrl} alt="" />
    {:else}
      <Fa icon={faUserCircle} size={'3x'} />
    {/if}
    Profile
  </a>
  <a
    use:link
    href="/#settings/servers"
    class="flex flex-col gap-y-4 capitalize w-80 text-3xl rounded-md font-extrabold btn btn-primary  relative"
  >
    <div class="text-black dark:text-white">
      {$servers.length}
    </div>
    Server{$servers.length - 1 ? 's' : ''}
  </a>
</main>
