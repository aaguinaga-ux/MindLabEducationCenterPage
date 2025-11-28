import { fetchCursos } from "./fetchDatosCursos.js";
import { procesarCursos } from "../utils/transformarDatos.js";
import { renderTablaCursosResumen } from "../utils/renderTablaResumen.js";

export let cursosProcesadosGlobal = [];

(async () => {
  const datos = await fetchCursos();
  const cursosProcesados = procesarCursos(datos);
  cursosProcesadosGlobal = cursosProcesados;
  renderTablaCursosResumen(cursosProcesados);
})();

