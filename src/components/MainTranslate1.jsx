import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Translator_selector from "./Translatator_selector";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import translate from "google-translate-api-x";

function MainTranslate1({ lang = "es" }) {
	const [lng, setLng] = useState("es");
	const [text, setText] = useState(false);
	const [translation, setTranslation] = useState(false);
	function procesarTraductor() {
		let d = document.getElementById("textAreaSource").value;
		setText(d);
		traducir(d, lng);
	}
	async function traducir(text, to) {
		console.log("will go to translate with:");
		console.log(`Text::${text}:: and to::${to}::`);
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
				translate(text, { to: to })
					.then((value) => {
						console.log("txt::", value.text);
						setTranslation(value.text);
					})
					.catch((e) => {
						console.log("Error on single Translate:", e);
					});
			}
		} catch (e) {
			console.log("error::", e);
		}
	}
	let placeholder =
		lang == "es"
			? import.meta.env.VITE_MAIN_TRANSLATE_PLACEHOLDER_BTN_ES
			: import.meta.env.VITE_MAIN_TRANSLATE_PLACEHOLDER_BTN_EN;
	let btn_text =
		lang == "es" ? import.meta.env.VITE_MAIN_TRANSLATE_BTN_ES : import.meta.env.VITE_MAIN_TRANSLATE_BTN_EN;

	return (
		<Container fluid>
			<Row>
				<Col lg={{ span: 4, offset: 1 }}>
					<Form.Control
						id="textAreaSource"
						name="textAreaSource"
						as="textarea"
						placeholder={placeholder}
						rows={8}
					/>
				</Col>
				<Col>
					<Translator_selector setlang={setLng} lang={lang} />
				</Col>
				<Col>
					<Button
						id="btnProcesar"
						onClick={() => {
							procesarTraductor();
						}}
					>
						{btn_text}
					</Button>
				</Col>
				<Col>{translation && <div>{translation}</div>}</Col>
			</Row>
			<Row></Row>
		</Container>
	);
}
export default MainTranslate1;
