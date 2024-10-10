import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Translator_selector from "./Translatator_selector";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Translate from "./Translate";
function MainTranslate1() {
	const [lang, setLang] = useState("es");
	const [text, setText] = useState(false);
	function procesarTraductor() {
		let d = document.getElementById("textAreaSource").value;
		setText(d);
	}
	return (
		<Container fluid>
			<Row>
				<Col lg={{ span: 4, offset: 1 }}>
					<Form.Control
						id="textAreaSource"
						name="textAreaSource"
						as="textarea"
						placeholder="Leave a comment here"
						rows={8}
					/>
				</Col>
				<Col>
					<Translator_selector setLang={setLang} />
				</Col>
				<Col>
					<Button
						id="btnProcesar"
						onClick={() => {
							procesarTraductor();
						}}
					>
						Procesar
					</Button>
				</Col>
				<Col>
					{text && <Translate text={text} to={lang} />}
					{/* <Form.Control
						id="textAreaDestination"
						name="textAreaDestination"
						as="textarea"
						placeholder="Leave a comment here"
						rows={4}
					/> */}
				</Col>
			</Row>
			<Row></Row>
		</Container>
	);
}
export default MainTranslate1;
