import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Translator_selector from "./Translatator_selector";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Tesseract from "tesseract.js";
function ImageToText() {
	const [imagePath, setImagePath] = useState("");
	const [text, setText] = useState("");
	const [enableButton, setEnableButton] = useState(false);
	//handle change of image selected
	const handleChange = (event) => {
		setImagePath(URL.createObjectURL(event.target.files[0]));
		setEnableButton(true);
	};
	//handle click on button to recognize text
	const handleClick = () => {
		setEnableButton(false);
		Tesseract.recognize(imagePath, "eng", {
			logger: (m) => console.log(m),
		})
			.catch((err) => {
				console.error(err);
			})
			.then((result) => {
				// Get Confidence score
				console.log("result:", result);
				let confidence = result.data.confidence;
				if (confidence > 75) {
					console.log("confidence:", confidence);
					let text = result.data.text;
					setText(text);
				} else {
					setText("Process ended with a confidence lower than expected");
				}
			});
	};

	return (
		<Container fluid>
			<Row>
				<Col lg={{ span: 3, offset: 4 }}>
					<input type="file" onChange={handleChange} accept="image/jpeg,image/gif,image/png,image/x-eps" />
				</Col>
				<Col>{enableButton && <Button onClick={handleClick}>Convert to text</Button>}</Col>
			</Row>
			<Row>
				<Col lg={{ span: 3, offset: 2 }}>
					{imagePath && (
						<>
							<h3>Actual Image uploaded</h3>
							<img style={{ maxWidth: "600px" }} src={imagePath} alt="no imgage" />
						</>
					)}
				</Col>
				{text && (
					<Col lg={"auto"}>
						<h3>Extracted text</h3>
						<div className="text-box">{text}</div>
					</Col>
				)}
			</Row>
		</Container>
	);
}
export default ImageToText;
