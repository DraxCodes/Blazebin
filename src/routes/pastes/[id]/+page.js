export async function load({ params }) {
	const id = params.id;
	const pasteResponse = await fetch(`http://localhost:5173/api/db/get?url_slug=${id}`);

	const pasteResult = await pasteResponse.json();
	return {
		paste: pasteResult
	};
}
