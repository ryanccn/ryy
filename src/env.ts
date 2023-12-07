export type Bindings = {
	KV: KVNamespace;
	SECRET?: string;
};
export type Variables = Record<string, never>;

export type Env = {
	Bindings: Bindings;
	Variables: Variables;
};
