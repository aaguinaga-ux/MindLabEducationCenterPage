import { fetchCursos } from "/MindLabEducationCenterPage/services/fetchDatosCursos.js";
import { renderTablaCursosResumen } from "/MindLabEducationCenterPage/renderTablaResumen.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const filtroGrupo = document.getElementById("filtroGrupo");
    const filtroEstatus = document.getElementById("filtroEstatus");
    const filtroOrden = document.getElementById("filtroOrden");
    const contadorFiltros = document.getElementById("contadorFiltros");
    const btnReset = document.getElementById("resetFiltros");

   function obtenerClasesValoracion(valor) {
        if (valor == null || valor <= 0) {
            return "bg-gray-200 text-gray-600";
        } else if (valor < 2.5) {
            return "bg-red-500/80 text-white";
        } else if (valor <= 3.5) {
            return "bg-orange-500/80 text-white";
        } else {
            return "bg-green-500/80 text-white";
        }
    }

    let cursos = await fetchCursos();

    cursos = cursos.map(curso => {
      const total = Number(curso.TotalAlumnos);

      const TasaAbandono = total > 0
        ? ((Number(curso.TotalAlumnosAbandono) / total) * 100).toFixed(0)
        : 0;

      const TasaFinalizacion = total > 0
        ? ((Number(curso.TotalAlumnosGraduados) / total) * 100).toFixed(0)
        : 0;

      const valoracion = (curso.ValoracionCurso != null && curso.ValoracionCurso > 0)
        ? `${curso.ValoracionCurso} / 5`
        : "Sin datos";

      const clasesValoracion = obtenerClasesValoracion(curso.ValoracionCurso);

      return {
        ...curso,
        TasaAbandono,
        TasaFinalizacion,
        valoracion,
        clasesValoracion
      };
    });


    renderTablaCursosResumen(cursos);

    const nombresCursosUnicos = [...new Set(cursos.map(c => c.NombreCurso).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));

    filtroGrupo.innerHTML = `<option value="">Todos los cursos</option>`;
    nombresCursosUnicos.forEach(nombre => {
      const option = document.createElement("option");
      option.value = nombre;
      option.textContent = nombre;
      filtroGrupo.appendChild(option);
    });

 
    const estadosUnicos = [
    ...new Set(
        cursos
        .map(c => c.Estado?.trim())
        .filter(Boolean)
    )
    ].sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));


    estadosUnicos.forEach(est => {
    const option = document.createElement("option");
    option.value = est.toLowerCase();   
    option.textContent = est;          
    filtroEstatus.appendChild(option);
    });



    function aplicarFiltros() {
      const valGrupo = filtroGrupo.value;
      const valEstatus = filtroEstatus.value;

      const filtrados = cursos.filter(curso => {
        const grupoMatch = valGrupo ? curso.NombreCurso === valGrupo : true;

        const estatusReal = (curso.Estado || "").toLowerCase();
        const estatusMatch = valEstatus 
        ? estatusReal === valEstatus 
        : true;


        return grupoMatch && estatusMatch;
      });

        if (filtroOrden.value === "desc") {
            filtrados.sort((a, b) => {
                const valA = Number(a.ValoracionCurso) || 0;
                const valB = Number(b.ValoracionCurso) || 0;
                return valB - valA; 
            });
        }

      const totalActivos = [valGrupo, valEstatus].filter(v => v).length;

      if (totalActivos > 0) {
        contadorFiltros.textContent = totalActivos;
        contadorFiltros.classList.remove("hidden");
      } else {
        contadorFiltros.classList.add("hidden");
      }

      renderTablaCursosResumen(filtrados);
    }

    filtroGrupo.addEventListener("change", aplicarFiltros);
    filtroEstatus.addEventListener("change", aplicarFiltros);
    filtroOrden.addEventListener("change", aplicarFiltros);


    btnReset.addEventListener("click", () => {
      filtroGrupo.value = "";
      filtroEstatus.value = "";
      filtroOrden.value = "";
      aplicarFiltros();
    });

  } catch (err) {
    console.error("Error en filtrarCursos.js:", err);
  }
});



