import { MONGODB_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';

export const ConnectToMongoDB = async () => {
	let mongoClient;
	try {
		const uri = encodeURI(MONGODB_URL);
		mongoClient = new MongoClient(uri);
		await mongoClient.connect();
		return mongoClient;
	} catch (error) {
		console.error('Connection to MongoDB failed!', error);
		process.exit();
	}
};

export const AddPaste = async (paste) => {
	let mongoClient;
	try {
		mongoClient = await ConnectToMongoDB();
		console.log('Connecting to MongoDB... (Add Paste)', paste.url_slug);
		const db = mongoClient.db('Blazebin');
		const collection = db.collection('pastes');

		await collection.insertOne(paste);
	} finally {
		await mongoClient.close();
	}
};

export const GetPaste = async (id) => {
	let mongoClient;
	try {
		mongoClient = await ConnectToMongoDB();
		console.log('Connecting to MongoDB... (GetPaste)', id);
		const db = mongoClient.db('Blazebin');
		const collection = db.collection('pastes');

		const query = { url_slug: id };

		const result = await collection.findOne(query);
		return result;
	} finally {
		await mongoClient.close();
	}
};
