<script lang="ts">
  import { user } from '$lib/stores/user';
  let userId = '';
  let token = '';
</script>

<div class="flex flex-col h-full items-center justify-center gap-8">
  {#if $user}
    <img
      src={$user.avatarUrl ||
        'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6918e57475a843f59f_icon_clyde_black_RGB.svg'}
      alt="Server icon url"
      class="w-40 object-cover rounded-full" />
    <h2 class="text-xl font-bold w-30 truncate">
      {$user.username}
    </h2>
    <button on:click={user.logout} class="btn btn-error btn-outline">
      Logout
    </button>
  {:else}
    <p class="text-3xl font-bold">Login</p>

    <form
      on:submit|preventDefault={() => {
        user.createToken(userId);
      }}>
      <label class="input-group w-min">
        <span class="w-20 justify-center">ID</span>
        <input
          bind:value={userId}
          type="text"
          placeholder="427602248139276298"
          class="input input-bordered placeholder:opacity-30 focus:outline-none" />
        <button
          class:!btn-disabled={!userId.length}
          class="btn btn-outline btn-primary w-32">Create Token</button>
      </label>
    </form>

    <form
      on:submit|preventDefault={() => {
        user.login(token);
      }}>
      <label class="input-group w-min">
        <span class="w-20 justify-center">Token</span>
        <input
          bind:value={token}
          type="password"
          class="input input-bordered placeholder:opacity-30 focus:outline-none" />
        <button
          class:!btn-disabled={token.length !== 24}
          class="btn btn-outline btn-primary w-32">Login</button>
      </label>
    </form>
  {/if}
</div>
