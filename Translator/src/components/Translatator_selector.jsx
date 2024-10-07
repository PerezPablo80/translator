import Form from "react-bootstrap/Form";
function Translator_selector({ setLang = "es" }) {
	return (
		<Form.Select
			aria-label="select example"
			onChange={(e) => {
				setLang ? setLang(e.target.value) : alert("changed to:" + e.target.value);
			}}
		>
			<option value="es">Seleccione idioma para traducción</option>
			<option value="es">Español</option>
			<option value="pt">Portugues</option>
			<option value="it">Italiano</option>
			<option value="dt">Aleman</option>
		</Form.Select>
	);
}
export default Translator_selector;
