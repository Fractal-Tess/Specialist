<script lang="ts">
  import Router from 'svelte-spa-router';
  import Index from '$routes/Index.svelte';
  import Settings from '$routes/settings/Settings.svelte';
  import Profile from '$routes/settings/Profile.svelte';
  import Servers from '$routes/settings/Servers.svelte';

  const routes = {
    '/': Index,
    '/#settings': Settings,
    '/#settings/profile': Profile,
    '/#settings/servers': Servers
  };
</script>

<Router {routes} />
