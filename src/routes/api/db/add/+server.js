import { AddPaste } from '$lib/mongoDb';

export async function POST({ request }) {
	const { language, body, date, url_slug } = await request.json();
	try {
		await AddPaste({ language, body, date, url_slug });
		return new Response(JSON.stringify({ status: 'Paste Added' }), {
			status: 200,
			statusText: 'ok'
		});
	} catch (error) {
		return new Response(error, {
			status: 500,
			statusText: 'server error'
		});
	}
}
