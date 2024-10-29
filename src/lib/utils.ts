import { error } from "@sveltejs/kit";
import { safeParse, type BaseIssue, type BaseSchema } from "valibot";

import { timingSafeEqual } from "./crypto";

const formDataToObject = (formData: FormData) => {
  const obj: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      throw new TypeError("File handling is not implemented!");
    }

    obj[key] = value;
  }

  return obj;
};

export const parseFormData = <
  T extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  schema: T,
  formData: FormData,
) => {
  const obj = formDataToObject(formData);
  const outcome = safeParse(schema, obj);

  if (!outcome.success) {
    error(400);
  }

  return outcome.output;
};

export const verifySecret = (
  userSecret: string,
  serverSecret: string,
): boolean => {
  const te = new TextEncoder();

  const a = te.encode(userSecret);
  const b = te.encode(serverSecret);

  return timingSafeEqual(a, b);
};

export const formatKey = (id: string) => `link-v1:${id}`;
