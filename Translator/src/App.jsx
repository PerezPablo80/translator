import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
function App() {
	const [lang, setLang] = useState("es");
	const [active, setActive] = useState(false);
	const actual = useRef();
	function handleSelection(sel_type) {
		if (actual.current == sel_type) {
			actual.current = false;
			setActive(false);
		} else {
			actual.current = sel_type;
			switch (sel_type) {
				case "pdf":
					setActive(<PDFToText />);
					break;
				case "ocr_image":
					setActive(<ImageToText />);
					break;
				case "translate_text":
					setActive(<MainTranslate1 />);
					break;
			}
		}
	}
	// https://react-bootstrap.netlify.app/docs/components/buttons/ <<- radio toggleButton
	//usar esto para seleccionar español o ingles
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
			{getMenu()}
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

/** 
 (<Nav variant="tabs">
			<Nav.Item>
				<Nav.Link onClick={() => handleSelection("pdf")}>
					{lang.includes("es")
						? import.meta.env.VITE_NAV_PDF_TO_TEXT_ES
						: import.meta.env.VITE_NAV_PDF_TO_TEXT_EN}
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link onClick={() => handleSelection("ocr_image")}>
					{lang.includes("es")
						? import.meta.env.VITE_NAV_IMG_TO_TEXT_ES
						: import.meta.env.VITE_NAV_IMG_TO_TEXT_EN}
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link onClick={() => handleSelection("translate_text")}>
					{lang.includes("es")
						? import.meta.env.VITE_NAV_TRANSLATE_TEXT_ES
						: import.meta.env.VITE_NAV_TRANSLATE_TEXT_EN}
				</Nav.Link>
			</Nav.Item>
		</Nav>)
*/
