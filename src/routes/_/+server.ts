import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const fallback: RequestHandler = () => {
  return redirect(303, "/_/create");
};
