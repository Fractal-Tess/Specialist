<script lang="ts">
  import Router from 'svelte-spa-router';

  import Index from '$routes/Index.svelte';
  import Settings from '$routes/settings/Settings.svelte';
  import Profile from '$routes/settings/Profile.svelte';
  import Servers from '$routes/settings/Servers.svelte';

  import Audios from '$routes/content/audios/Audios.svelte';
  import CreateAudio from '$routes/content/audios/Create.svelte';
  import ViewAudio from '$routes/content/audios/Create.svelte';

  import Images from '$routes/content/images/Images.svelte';
  import CreateImage from '$routes/content/images/Create.svelte';
  import ViewImage from '$routes/content/images/Create.svelte';

  const routes = {
    '/': Index,

    '/#content/audios': Audios,
    '/#content/audios/view': ViewAudio,
    '/#content/audios/create': CreateAudio,

    '/#content/images': Images,
    '/#content/images/view': ViewImage,
    '/#content/images/create': CreateImage,

    '/#settings': Settings,
    '/#settings/profile': Profile,
    '/#settings/servers': Servers
  };
</script>

<Router {routes} />
