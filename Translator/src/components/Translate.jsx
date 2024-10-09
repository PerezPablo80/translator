import translate from "google-translate-api-x";
import { useEffect, useState } from "react";
function Translate({ text, to }) {
	const [translation, setTranslation] = useState(false);
	async function traducir(text, to) {
		try {
			if (text.length > 5000) {
				const chunks = [];
				while (text.length) chunks.push(text.splice(0, 5000).join(""));
				Promise.all(chunks.map((chunk) => translate(chunk, { to: to })))
					.then((values) => {
						console.log("values.join:", values.text.join(""));
						setTranslation(values.text.join(""));
					})
					.catch((e) => {
						console.log("Exception promising all:", e);
					});
			} else {
				Promise.all(translate(text, { to: to, client: "gtx" })).then((values) => {
					let txt = "";
					values.forEach((v) => {
						txt += v.text;
					});
					console.log("txt::", txt);
					setTranslation(txt);
					// console.log("values.join:", values.text.join(""));
					// setTranslation(values.text.join(""));
				});
				// const res = await translate(text, { to: to, client: "gtx" });
				// console.log("::res::", res);
				// setTranslation(res);
			}
		} catch (e) {
			console.log("error::", e);
		}
	}
	useEffect(() => {
		traducir(text, to);
	}, []);

	return translation ? <div>{translation.text}</div> : <p>Procesando</p>;
}
export default Translate;
