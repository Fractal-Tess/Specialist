<script lang="ts">
  import { user } from '$lib/stores/user';
</script>

{#if $user}
  <div class="flex flex-col gap-y-2">
    <h1 class="text-center">
      Currently logged in as <br />
    </h1>
    <div class="flex items-center gap-x-2 text-xl font-bold">
      <img src={$user.avatarUrl} class="w-20 rounded-lg" alt="" />
      <span class="text-2xl text-secondary">{$user.username}</span>
    </div>
  </div>
  <button on:click={user.logout} class="btn btn-secondary"> Logout </button>
{:else}
  <h2>Not logged in</h2>
{/if}
