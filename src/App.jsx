import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
function App() {
	const [lang, setLang] = useState("es");
	const [active, setActive] = useState(false);
	const actual = useRef();
	const [update, setUpdate] = useState(true);
	function handleSelection(sel_type) {
		if (actual.current == sel_type) {
			actual.current = false;
			setActive(false);
		} else {
			actual.current = sel_type;
			switch (sel_type) {
				case "pdf":
					setActive(<PDFToText lang={lang} />);
					break;
				case "ocr_image":
					setActive(<ImageToText lang={lang} />);
					break;
				case "translate_text":
					setActive(<MainTranslate1 lang={lang} />);
					break;
			}
		}
	}
	function updateLanguage(text) {
		setLang(text);
		setTimeout(() => {
			setUpdate(false);
		}, 10);
		setTimeout(() => {
			setUpdate(true);
		}, 10);
	}
	function getLang() {
		return (
			<ToggleButtonGroup
				type="radio"
				name="langOptions"
				defaultValue={"es"}
				onChange={(val) => {
					updateLanguage(val);
				}}
			>
				<ToggleButton id="tbg-radio-1" value={"es"} className="btn btn-secondary">
					Español
				</ToggleButton>
				<ToggleButton id="tbg-radio-2" value={"en"} className="btn btn-secondary">
					English
				</ToggleButton>
			</ToggleButtonGroup>
		);
	}
	function getMenu() {
		let pdf = lang == "es" ? import.meta.env.VITE_NAV_PDF_TO_TEXT_ES : import.meta.env.VITE_NAV_PDF_TO_TEXT_EN;
		let ocr = lang.includes("es")
			? import.meta.env.VITE_NAV_IMG_TO_TEXT_ES
			: import.meta.env.VITE_NAV_IMG_TO_TEXT_EN;
		let translate = lang.includes("es")
			? import.meta.env.VITE_NAV_TRANSLATE_TEXT_ES
			: import.meta.env.VITE_NAV_TRANSLATE_TEXT_EN;

		return (
			<Row className="justify-content-center">
				<Nav variant="tabs" justify fill className="custom-nav">
					<Nav.Item className="custom-nav-item">
						<Nav.Link className="nav-link" onClick={() => handleSelection("pdf")}>
							{pdf}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item className="custom-nav-item">
						<Nav.Link className="nav-link" onClick={() => handleSelection("ocr_image")}>
							{ocr}
						</Nav.Link>
					</Nav.Item>
					<Nav.Item className="custom-nav-item">
						<Nav.Link className="nav-link" onClick={() => handleSelection("translate_text")}>
							{translate}
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Row>
		);
	}
	return (
		<Container fluid className="main-container">
			{getLang()}
			{update && getMenu()}
			<br />
			{active}
		</Container>
	);
}
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import PDFToText from "./components/PDFToText";
import ImageToText from "./components/ImageToText";
import MainTranslate1 from "./components/MainTranslate1";
import Row from "react-bootstrap/esm/Row";
export default App;
