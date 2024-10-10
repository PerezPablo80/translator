import googleTranslate from "google-translate-api-x";

export default async function translate(req, res) {
	try {
		const { text, to } = req.query; // receive text and language as query params
		const result = await googleTranslate(text, { to });
		let resul = { result: result, resultado: "prueba de resultado" };
		res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
		res.status(200).json(resul);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
