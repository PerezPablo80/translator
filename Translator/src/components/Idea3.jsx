import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import pdfToText from "react-pdftotext";
function Idea3() {
	const [imagePath, setImagePath] = useState("");
	const [text, setText] = useState("");

	//handle change of image selected
	const handleChange = (event) => {
		const file = event.target.files[0];
		pdfToText(file)
			.then((text) => {
				setText(text);
			})
			.catch((e) => {
				console.log("Error on pdfToText:", e);
			});
	};

	return (
		<Container fluid>
			<Row>
				<Col>
					<p>Select PDF for text extraction</p>
				</Col>
				<Col>
					<input type="file" onChange={handleChange} />
				</Col>
			</Row>
			<Row>
				<Col>
					<h3>Extracted text</h3>
					<div className="text-box">{text}</div>
				</Col>
			</Row>
		</Container>
	);
}
export default Idea3;
