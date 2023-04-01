<script lang="ts">
  import FilterInput from '$lib/components/FilterInput.svelte';
  import NewItemButton from '$lib/components/NewItemButton.svelte';
  import { trpc } from '$lib/trpc';
  import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { user } from '$lib/stores/user';
  import { onDestroy } from 'svelte';

  let filter = '';
  let audios: Awaited<ReturnType<typeof trpc.getAudios.query>>;

  const fetchAudios = async () => (audios = await trpc.getAudios.query());
  fetchAudios();

  let delay = 0;
  let interval: NodeJS.Timer;
  const startDelay = () => {
    delay = 3;
    interval = setInterval(() => {
      delay--;
      if (delay === 0) clearInterval(interval);
    }, 1000);
  };
  onDestroy(() => {
    clearInterval(interval);
  });
  $: console.log(filter);
</script>

<div class="relative h-full py-8">
  <FilterInput bind:filter />

  {#if $user}
    <!-- content here -->

    <ul class="p-8">
      {#each audios ? audios.filter( a => a.tag.includes(filter) ) : [] as { author, resource_url, tag }}
        <li
          class="max-w-max aspect-[1/1] p-4 border-primary border-[1px] rounded-md flex flex-col items-center justify-center gap-y-2">
          <p class="font-bold">{tag}</p>
          <div class="flex gap-x-2">
            <button
              class:!btn-disabled={delay > 0}
              class="text-primary hover:scale-125 duration-300 transition-transform"
              on:click={async () => {
                if (!$user) return;
                await trpc.playAudio.mutate({
                  audioUrl: resource_url,
                  discordUserId: $user.id
                });
                startDelay();
              }}>
              <Fa icon={faPlayCircle} size={'2x'} />
            </button>
            {#await trpc.getUser.query(author.discord_id) then { avatarUrl }}
              <img
                src={avatarUrl}
                class="h-8 rounded-full"
                alt="author avatar" />
            {/await}
          </div>
        </li>
      {:else}
        <p>No items found :(</p>
      {/each}
    </ul>
    <NewItemButton onClick={() => {}} />
  {:else}
    <p>You need to login first</p>
  {/if}
</div>
