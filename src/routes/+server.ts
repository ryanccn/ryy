import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
  const to = "https://ryanccn.dev/";

  return new Response(`${to}`, {
    status: 303,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      location: to,
    },
  });
};
