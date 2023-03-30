<script lang="ts">
  let userId = '';
</script>

<form on:submit|preventDefault action="" class="form-control gap-y-4">
  <label class="label" for="user_id">
    <span class="label-text">Discord user ID</span>
  </label>
  <input
    id="user_id"
    bind:value={userId}
    type="text"
    placeholder="example: 278203585055948805"
    class="input input-bordered w-80 placeholder:opacity-30"
  />
</form>

<h1>Hello</h1>
