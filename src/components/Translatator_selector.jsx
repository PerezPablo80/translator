import Form from "react-bootstrap/Form";
function Translator_selector({ setLang, lang = "es" }) {
	let lngEs = (
		<Form.Select
			aria-label="select example"
			onChange={(e) => {
				setLang(e.target.value);
			}}
		>
			<option value="es">Seleccione idioma para traducción</option>
			<option value="es">Español</option>
			<option value="pt">Portugues</option>
			<option value="it">Italiano</option>
			<option value="dt">Aleman</option>
		</Form.Select>
	);

	let lngEn = (
		<Form.Select
			aria-label="select example"
			onChange={(e) => {
				setLang(e.target.value);
			}}
		>
			<option value="en">Select language to translate to</option>
			<option value="dn">English</option>
			<option value="es">Spanish</option>
			<option value="pt">Portuguese</option>
			<option value="it">Italian</option>
			<option value="dt">German</option>
		</Form.Select>
	);
	if (lang == "es") return lngEs;
	return lngEn;
}
export default Translator_selector;
