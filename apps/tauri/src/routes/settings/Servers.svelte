<script lang="ts">
  import { alert } from '$lib/stores/alert';
  import { servers } from '$lib/stores/servers';

  let serverId = '';
  const addServer = async () => {
    try {
      await servers.addServer(serverId);
      serverId = '';
    } catch (error) {
      if (error instanceof Error)
        alert.show({
          level: 'error',
          message: error.message
        });
    }
  };
</script>

<div class="flex flex-col h-full items-center justify-center gap-y-20">
  <ul
    class="max-w-sm md:max-w-lg lg:max-w-3xl flex overflow-x-scroll gap-x-8 p-8"
  >
    {#each $servers as { iconUrl, id, name } (id)}
      <li
        class="flex flex-col items-center justify-center gap-y-4 w-40 py-4 border-2 border-primary rounded-md "
      >
        <img
          src={iconUrl ||
            'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6918e57475a843f59f_icon_clyde_black_RGB.svg'}
          alt="Server icon url"
          class="rounded-3xl w-20 h-20 object-cover"
        />
        <h2 class="text-xl font-bold  w-30  truncate">
          {name}
        </h2>
        <div class="card-actions justify-end">
          <button
            class="btn btn-error btn-outline"
            on:click={() => servers.removeServer(id)}>Remove</button
          >
        </div>
      </li>
    {:else}
      <p class="text-3xl font-bold">You haven't added any servers</p>
    {/each}
  </ul>

  <form on:submit|preventDefault={addServer}>
    <label class="input-group w-min">
      <span>ID</span>
      <input
        bind:value={serverId}
        type="text"
        placeholder="427602248139276298"
        class="input input-bordered placeholder:opacity-30 focus:outline-none"
      />
      <button
        class:!btn-disabled={!serverId.length}
        class="btn btn-outline btn-primary ">Add</button
      >
    </label>
  </form>
</div>
