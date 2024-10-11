import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Translator_selector from "./Translatator_selector";
import { useState } from "react";
import Button from "react-bootstrap/Button";

function MainTranslate1({ lang = "es" }) {
	const size = 47;
	const [lng, setLang] = useState("es");
	const [text, setText] = useState(false);
	const [counter, setCounter] = useState(0);
	const [translation, setTranslation] = useState(false);
	function procesarTraductor() {
		let d = document.getElementById("textAreaSource").value;
		setText(d);
		traducir(d, lng);
	}
	async function traducir(text, to) {
		try {
			if (text.split(" ").length > size) {
				let arr = text.split(" ");
				text = "";
				for (let i = 0; i < size; i++) {
					text = text + arr[i] + " ";
				}
			}
			console.log("text::", text);
			fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${to}&dt=t&q=${text}`)
				.then(async (response) => {
					let j = await response.json();
					setTranslation(j[0][0][0]);
				})
				.catch((e) => {
					console.log("ERrroorrrr:", e);
				});
		} catch (e) {
			console.log("error::", e);
		}
	}
	function updateWordCount() {
		let txt = document.getElementById("textAreaSource").value;
		let count = txt.split(" ").length;
		setCounter(size - count);
	}
	let placeholder =
		lang == "es"
			? import.meta.env.VITE_MAIN_TRANSLATE_PLACEHOLDER_BTN_ES
			: import.meta.env.VITE_MAIN_TRANSLATE_PLACEHOLDER_BTN_EN;
	let btn_text =
		lang == "es" ? import.meta.env.VITE_MAIN_TRANSLATE_BTN_ES : import.meta.env.VITE_MAIN_TRANSLATE_BTN_EN;
	let max_text =
		lang == "es"
			? import.meta.env.VITE_MAIN_TRANSLATE_MAX_TEXT_ES
			: import.meta.env.VITE_MAIN_TRANSLATE_MAX_TEXT_EN;
	return (
		<Container fluid>
			<Row>
				<Col lg={{ span: 4, offset: 1 }}>
					<label>{max_text}</label>
					<br />
					<span id="wordCount">{counter}</span>
					<Form.Control
						id="textAreaSource"
						name="textAreaSource"
						as="textarea"
						placeholder={placeholder}
						rows={8}
						onChange={() => {
							updateWordCount();
						}}
						// maxLength={5000}
					/>
				</Col>
				<Col lg={{ span: 1 }}>
					<Translator_selector setLang={setLang} lang={lang} />
				</Col>
				<Col lg={{ span: 1 }}>
					<Button
						id="btnProcesar"
						onClick={() => {
							procesarTraductor();
						}}
					>
						{btn_text}
					</Button>
				</Col>
				<Col>
					{translation && (
						<div style={{ backgroundColor: "gray", borderRadius: 3, padding: 10 }}>{translation}</div>
					)}
				</Col>
			</Row>
			<Row></Row>
		</Container>
	);
}
export default MainTranslate1;
