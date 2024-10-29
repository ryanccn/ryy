<script lang="ts">
  import "../app.css";
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<main class="mx-auto max-w-xl px-8 py-20">
  {@render children()}
</main>
