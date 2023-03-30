<script lang="ts">
  import {
    faXmark,
    faWindowMinimize,
    faGear,
    faArrowLeftLong,
    faUser,
    faUserClock,
    faUserCircle,
    faArrowLeft,
    faArrowRight
  } from '@fortawesome/free-solid-svg-icons';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import { appWindow } from '@tauri-apps/api/window';
  import { theme } from '$lib/stores/theme';
  import ThemeToggle from '$lib/components/ThemeToggleIcon.svelte';
  import Fa from 'svelte-fa';

  import { pop, link } from 'svelte-spa-router';
  import { user } from '$lib/stores/user';
</script>

<div
  data-tauri-drag-region
  class="flex h-12 items-center justify-between bg-base-100 px-2 shadow-lg "
>
  <div class="flex gap-x-4 font-bold">
    <button on:click={pop}>
      <Fa icon={faArrowLeft} size="1.5x" />
    </button>

    <button
      on:click={() => {
        window.history.forward();
      }}
    >
      <Fa icon={faArrowRight} size="1.5x" />
    </button>
    <a href="/#content/audios">Audios</a>
    <a href="/#content/images">Images</a>
  </div>

  <div class="flex items-center gap-x-3 h-full">
    <a href="/#settings" use:link class="max-h-full py-1">
      {#if $user}
        <img
          src={$user.avatarUrl}
          alt="user avatar"
          class="max-h-full py-1 rounded-3xl"
        />
      {:else}
        <Fa icon={faUserCircle} size="2x" />
      {/if}
    </a>

    <ThemeToggle theme={$theme} onClick={theme.toggleTheme} />

    <a
      href="https://github.com/Fractal-Tess/Specialist"
      target="_blank"
      rel="noopener noreferer"
    >
      <Fa icon={faGithub} size="1.5x" />
    </a>
    <button on:click={appWindow.minimize}>
      <Fa size="1.5x" icon={faWindowMinimize} />
    </button>
    <button on:click={appWindow.close}>
      <Fa size="1.5x" icon={faXmark} />
    </button>
  </div>
</div>
