export const handleUmami = async ({
	key,
	instance,
	siteId,
	request,
}: {
	key: string;
	instance: string;
	siteId: string;
	request: Request;
}) => {
	const endpoint = new URL("/api/send", instance);
	const body = {
		type: "event",
		payload: {
			hostname: new URL(request.url).hostname,
			referrer: request.headers.get("referer") ?? "",
			title: key,
			url: request.url,
			website: siteId,
		},
	} as const;

	const headers = new Headers();
	headers.set("content-type", "application/json; encoding=utf-8");

	const userAgent = request.headers.get("user-agent");
	if (userAgent) headers.set("user-agent", userAgent);

	const clientIp = request.headers.get("x-real-ip");
	if (clientIp) headers.set("x-real-ip", clientIp);

	console.log(headers.get);

	const resp = await fetch(endpoint, {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	});

	if (!resp.ok) console.error(`Failed to post data to Umami: ${resp.status} ${resp.statusText}`);
};
