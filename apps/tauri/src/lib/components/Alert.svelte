<script lang="ts">
  import { alert } from '$lib/stores/alert';

  $: alertClass =
    $alert?.level === 'error'
      ? 'alert-error'
      : $alert?.level === 'warning'
      ? 'alert-warning'
      : $alert?.level === 'success'
      ? 'alert-success'
      : $alert?.level === 'info'
      ? 'alert-info'
      : 'Should not be possible';

  $: console.log(alertClass);
</script>

{#if $alert}
  <div class={`alert ${alertClass} shadow-lg`}>
    <div>
      <button on:click={alert.hide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
      </button>
      <span>{$alert.message}</span>
    </div>
  </div>
{/if}
