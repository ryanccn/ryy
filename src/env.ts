export type Bindings = {
	KV: KVNamespace;
	SECRET?: string;
	UMAMI_INSTANCE?: string;
	UMAMI_WEBSITE_ID?: string;
};
export type Variables = Record<string, never>;

export type Env = {
	Bindings: Bindings;
	Variables: Variables;
};
