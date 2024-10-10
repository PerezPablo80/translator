import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import pdfToText from "react-pdftotext";
function PDFToText({ lang = "es" }) {
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
					<p>
						{lang == "es"
							? import.meta.env.VITE_PDF_TO_TEXT_LABEL_ES
							: import.meta.env.VITE_PDF_TO_TEXT_LABEL_EN}
					</p>
					<input type="file" className="btn btn-success" onChange={handleChange} accept="application/pdf" />
				</Col>
			</Row>
			<Row>
				<Col>
					{text && (
						<>
							<h3>
								{lang == "es"
									? import.meta.env.VITE_EXTRACTED_TEXT_LABEL_ES
									: import.meta.env.VITE_EXTRACTED_TEXT_LABEL_EN}
							</h3>
							<div className="text-box">{text}</div>
						</>
					)}
				</Col>
			</Row>
		</Container>
	);
}
export default PDFToText;
