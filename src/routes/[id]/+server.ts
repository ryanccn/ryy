import { error } from "@sveltejs/kit";
import { formatKey } from "$lib/utils";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, platform }) => {
  if (!platform) error(500);

  const { id } = params;
  const to = await platform.env.KV.get(formatKey(id));

  if (!to) error(404);

  return new Response(`${to}`, {
    status: 303,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      location: to,
    },
  });
};
