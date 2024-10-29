import { formatKey, parseFormData, verifySecret } from "$lib/utils";
import { fail } from "@sveltejs/kit";

import {
  strictObject as vStrictObject,
  pipe as vPipe,
  string as vString,
  minLength as vMinLength,
} from "valibot";

import type { Actions } from "./$types";

const deleteSchema = vStrictObject({
  id: vPipe(vString(), vMinLength(1)),
  secret: vPipe(vString(), vMinLength(1)),
});

export const actions = {
  default: async ({ request, platform }) => {
    if (!platform) return fail(500, { error: "Platform is not available" });

    const data = await request
      .formData()
      .then((d) => parseFormData(deleteSchema, d));

    if (!verifySecret(data.secret, platform.env.SECRET)) {
      return fail(401, { error: "Secret is invalid" });
    }

    await platform.env.KV.delete(formatKey(data.id));
  },
} satisfies Actions;
