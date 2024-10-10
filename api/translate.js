import googleTranslate from "google-translate-api-x";

export default async function handler(req, res) {
	try {
		const { text, to } = req.query; // receive text and language as query params
		console.log(`on translate.js: text:${text} and to:${to}`);
		const result = await googleTranslate(text, { to });
		console.log("result:::::::", result);
		res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
