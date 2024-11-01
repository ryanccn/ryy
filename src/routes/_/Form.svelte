<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  import SendIcon from "~icons/lucide/send";
  import ShuffleIcon from "~icons/lucide/shuffle";

  import { nanoid } from "nanoid";

  let {
    includeTo = false,
    includeNanoid = false,
  }: {
    includeTo?: boolean;
    includeNanoid?: boolean;
  } = $props();

  let submitting = $state(false);
  let inputId = $state("");
</script>

<form
  method="POST"
  class="flex flex-col gap-y-4"
  use:enhance={() => {
    submitting = true;

    return (ev) => {
      ev.update()
        .finally(() => {
          submitting = false;
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }}
>
  <!-- eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -->
  {#if $page.form && typeof $page.form.error === "string"}
    <p class="text-red-500 text-sm font-medium">
      {($page.form as { error: string }).error}
    </p>
  {/if}

  <div class="flex flex-col gap-4">
    <label class="flex flex-col gap-1">
      <span class="text-xs font-medium">Secret</span>
      <input
        name="secret"
        id="secret"
        type="password"
        autocomplete="current-password"
        class="bg-neutral-100 px-2 py-1 rounded-sm text-sm"
        required
      />
    </label>

    <label class="flex flex-col gap-1">
      <span class="text-xs font-medium">Link</span>
      <div class="relative">
        <span
          class="absolute left-0 top-1/2 -translate-y-1/2 my-auto pl-2 text-sm font-medium text-neutral-400 pointer-events-none"
        >
          ryy.moe/
        </span>

        <input
          name="id"
          id="id"
          type="text"
          spellcheck="false"
          class="w-full bg-neutral-100 pl-[calc(0.5rem+7ch)] pr-2 py-1 gap-x-0.5 rounded-sm text-sm focus-within:ring-2"
          required
          bind:value={inputId}
          data-1p-ignore
        />

        {#if includeNanoid}
          <button
            type="button"
            class="absolute right-0 top-1/2 -translate-y-1/2 my-auto p-1.5"
            onclick={() => {
              inputId = nanoid(6);
            }}
          >
            <ShuffleIcon class="block size-3.5" />
          </button>
        {/if}
      </div>
    </label>

    {#if includeTo}
      <label class="flex flex-col gap-1">
        <span class="text-xs font-medium">To</span>
        <input
          name="to"
          id="to"
          type="url"
          class="bg-neutral-100 px-2 py-1 rounded-sm text-sm"
          required
          data-1p-ignore
        />
      </label>
    {/if}
  </div>

  <button
    class="self-end mt-2 flex flex-row items-center gap-x-1.5 text-sm font-medium rounded-sm bg-blue-500 text-white px-2.5 py-1.5 disabled:opacity-75"
    disabled={submitting}
  >
    <SendIcon class="block size-4" />
    <span>Submit</span>
  </button>
</form>
