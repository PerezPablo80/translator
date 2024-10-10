import googleTranslate from "google-translate-api-x";

export default async function translate(req, res) {
	try {
		const { text, to, from } = req.query; // receive text and language as query params
		const result = await fetch("https://libretranslate.de/translate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				q: text,
				source: "en",
				target: "es",
			}),
		});

		// 	.then((response) => response.json())
		// 	.then((data) => console.log(data.translatedText))
		// 	.catch((error) => console.error(error));
		// let resul = { result: json(result), resultado: "prueba de resultado" };
		res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
