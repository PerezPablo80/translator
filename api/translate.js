import googleTranslate from "google-translate-api-x";

export default async function translate(req, res) {
	try {
		const { text, to, from } = req.query; // receive text and language as query params
		const result = await fetch("https://libretranslate.com/translate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				q: text,
				source: from,
				target: to,
				format: "text",
				alternatives: 3,
				api_key: "",
			}),
		});

		res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
