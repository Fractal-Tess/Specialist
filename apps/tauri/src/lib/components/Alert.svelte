<script lang="ts">
  import { alert } from '$lib/stores/alert';
  import { faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';

  $: alertClass = $alert
    ? $alert.level === 'error'
      ? 'alert-error'
      : $alert.level === 'warning'
      ? 'alert-warning'
      : $alert.level === 'success'
      ? 'alert-success'
      : $alert.level === 'info'
      ? 'alert-info'
      : 'Should not be possible'
    : '';
</script>

{#if $alert}
  <div class={`alert ${alertClass} shadow-lg`}>
    <div>
      <button on:click={alert.hide}>
        <Fa icon={faXmarkCircle} />
      </button>
      <span class="font-bold  ">{$alert.message}</span>
    </div>
  </div>
{/if}
