<script lang="ts">
  import Link from "./Link.svelte";
  import type { Snippet } from "svelte";

  import PlusIcon from "~icons/lucide/plus";
  import PencilIcon from "~icons/lucide/pencil";
  import TrashIcon from "~icons/lucide/trash";

  let { children }: { children: Snippet } = $props();
</script>

<div class="flex flex-col gap-y-8">
  <h1 class="tracking-tight font-bold text-xl">ryy.moe</h1>

  <div class="flex flex-row gap-x-2">
    <Link href="/_/create">
      <PlusIcon class="block size-4" />
      <span>Create</span>
    </Link>
    <Link href="/_/edit">
      <PencilIcon class="block size-4" />
      <span>Edit</span>
    </Link>
    <Link href="/_/delete" style="danger">
      <TrashIcon class="block size-4" />
      <span>Delete</span>
    </Link>
  </div>

  {@render children()}
</div>
