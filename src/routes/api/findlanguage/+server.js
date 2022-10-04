import pkg from '@vscode/vscode-languagedetection';
const { ModelOperations } = pkg;

const moduleOperations = new ModelOperations();

const findLanguage = async (data) => {
	const result = await moduleOperations.runModel(data);
	return result;
};

export async function POST({ request }) {
	const input = await request.text();
	const possibleLangs = await findLanguage(input);

	return new Response(JSON.stringify(possibleLangs), {
		status: 200,
		statusText: 'ok'
	});
}
