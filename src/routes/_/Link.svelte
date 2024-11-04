<script lang="ts">
  import { page } from "$app/stores";
  import type { Snippet } from "svelte";

  import { twMerge } from "tailwind-merge";

  let {
    href,
    style,
    children,
  }: {
    href: string;
    style?: "danger";
    children?: Snippet;
  } = $props();
</script>

<a
  {href}
  class={twMerge([
    `flex flex-row gap-x-1.5 items-center font-medium text-sm rounded-sm px-2.5 py-1.5 border transition-colors`,
    $page.url.pathname === href
      ? style === "danger"
        ? "border-red-500 text-red-500 bg-red-500/5"
        : "border-blue-500 text-blue-500 bg-blue-500/5"
      : "border-black/20 hover:border-black/35",
  ])}
>
  {@render children?.()}
</a>
