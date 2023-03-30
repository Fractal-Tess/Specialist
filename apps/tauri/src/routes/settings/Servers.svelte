<script lang="ts">
  import { servers } from '$lib/stores/servers';

  let serverId = '';
  const addServer = async () => {
    try {
      await servers.addServer(serverId);
    } catch (error) {
      console.log('error');
    }
  };
</script>

<div class="flex flex-col h-full items-center justify-center gap-y-20">
  <ul class="">
    {#each $servers as { iconUrl, id, name } (id)}
      <li class="">
        <p>{name}</p>
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
        class="input input-bordered placeholder:opacity-30"
      />
      <button class="btn btn-outline btn-primary">Add</button>
    </label>
  </form>
</div>
