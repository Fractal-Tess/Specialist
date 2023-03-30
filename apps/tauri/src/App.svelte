<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import Alert from '$lib/components/Alert.svelte';
  import Router from './Router.svelte';
  import Layout from '$lib/layouts/base/Layout.svelte';
  import { alert } from '$lib/stores/alert';

  $: {
    document.documentElement.setAttribute('data-theme', $theme);
    document.documentElement.classList.value = $theme;
  }
</script>

<Layout>
  <Alert />
  <Router />
</Layout>
