import type { RequestHandler } from "./$types";

import { formatKey, verifySecret } from "$lib/utils";

import {
  strictObject as vStrictObject,
  pipe as vPipe,
  string as vString,
  minLength as vMinLength,
  safeParse as vSafeParse,
} from "valibot";

const createSchema = vStrictObject({
  id: vPipe(vString(), vMinLength(1)),
  to: vPipe(vString(), vMinLength(1)),
  secret: vPipe(vString(), vMinLength(1)),
});

export const POST: RequestHandler = async ({ request, platform }) => {
  if (!platform) return new Response(null, { status: 500 });

  const result = await request.json().then((d) => vSafeParse(createSchema, d));

  if (!result.success) {
    return new Response(null, { status: 400 });
  }

  const { output: data } = result;

  if (!verifySecret(data.secret, platform.env.SECRET)) {
    return new Response(null, { status: 401 });
  }

  const existing = await platform.env.KV.get(formatKey(data.id));

  if (existing !== null) {
    return new Response(null, { status: 400 });
  }

  await platform.env.KV.put(formatKey(data.id), data.to);
  return new Response(null, { status: 201 });
};
