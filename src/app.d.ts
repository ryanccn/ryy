import "unplugin-icons/types/svelte";

declare global {
  namespace App {
    interface Platform {
      env: {
        KV: KVNamespace;
        SECRET: string;
      };
      context: {
        waitUntil(promise: Promise<unknown>): void;
      };
      caches: CacheStorage & { default: Cache };
    }
  }
}

export {};
