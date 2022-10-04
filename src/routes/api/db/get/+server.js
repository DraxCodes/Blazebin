import { GetPaste } from '$lib/mongoDb';

export async function GET({ url }) {
	const id = url.searchParams.get('url_slug');
	var result = await GetPaste(id);

	if (result) {
		return new Response(JSON.stringify(result), {
			status: 200,
			statusText: 'ok'
		});
	} else {
		return new Response(JSON.stringify({ error: 'Paste not found.' }), {
			status: 404,
			statusText: 'paste not found'
		});
	}
}
