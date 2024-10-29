import { config } from "@ryanccn/eslint-config";

export default config({
  ignores: ["**/.svelte-kit"],
  globals: ["browser"],
  svelte: true,
  rules: {
    "@typescript-eslint/only-throw-error": "off",
  },
});
