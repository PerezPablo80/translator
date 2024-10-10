import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import pdfToText from "react-pdftotext";
function PDFToText() {
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
				<Col lg={{ span: 6, offset: 4 }}>
					<p>Select PDF for text extraction</p>
					<input type="file" className="btn btn-success" onChange={handleChange} accept="application/pdf" />
				</Col>
			</Row>
			<Row>
				<Col>
					{text && (
						<>
							<h3>Extracted text</h3>
							<div className="text-box">{text}</div>
						</>
					)}
				</Col>
			</Row>
		</Container>
	);
}
export default PDFToText;
