import { fetchCursos } from "/MindLabEducationCenterPage/fetchDatosCursos.js";
import { procesarCursos } from "/MindLabEducationCenterPage/utils/transformarDatos.js";
import { renderTablaCursosResumen } from "/MindLabEducationCenterPage/utils/renderTablaResumen.js";

export let cursosProcesadosGlobal = [];

(async () => {
  const datos = await fetchCursos();
  const cursosProcesados = procesarCursos(datos);
  cursosProcesadosGlobal = cursosProcesados;
  renderTablaCursosResumen(cursosProcesados);
})();

