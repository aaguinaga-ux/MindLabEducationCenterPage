export function renderTablaCursosResumen(cursos) {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    cursos.forEach(item => {
        tabla.innerHTML += `
        <tr class="divide-x divide-gray-200">

          <td class="text-center text-sm text-gray-700">${item.idGrupo}</td>
          <td class="text-center text-sm text-gray-700">${item.NombreCurso}</td>
          <td class="text-center text-sm text-gray-700">
            <div class="flex items-center justify-center px-2 py-1 w-[80%] rounded-md ${item.clasesValoracion} mx-auto">
              ${item.valoracion}
            </div>
          </td>

          <td class="text-center text-sm text-gray-700">${item.Estado}</td>
    
          <td class="px-2 py-3 text-sm text-center text-gray-700 tracking-tight cursor-pointer">
            <div class="w-full bg-gray-100 h-3 rounded-full relative overflow-hidden shadow-inner">
              <div
                class="h-full rounded-full transition-all duration-500 ease-out 
                      ${item.TasaFinalizacion >= 50 ? "bg-green-500" : "bg-yellow-500"}"
                style="width:${item.TasaFinalizacion}%"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center text-xs 
                          ${item.TasaFinalizacion >= 50 ? "text-white" : "text-gray-700"}">
                ${item.TasaFinalizacion}%
              </div>

            </div>
          </td>
        
          <td class="px-2 py-3 text-sm text-center text-gray-700 tracking-tight cursor-pointer">
            <div class="w-full bg-gray-100 h-3 rounded-full relative overflow-hidden shadow-inner">
              <div
                class="h-full rounded-full transition-all duration-500 ease-out 
                      ${item.TasaAbandono >= 50 ? "bg-red-500" : "bg-yellow-500"}"
                style="width:${item.TasaAbandono}%"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center text-xs 
                          ${item.TasaAbandono >= 50 ? "text-white" : "text-gray-700"}">
                ${item.TasaAbandono}%
              </div>

            </div>
          </td>
          <td class="px-2 py-3 text-sm text-center text-gray-700 tracking-tight cursor-pointer">
            <div class="w-full bg-gray-100 h-3 rounded-full relative overflow-hidden shadow-inner">
              <div
                class="h-full rounded-full transition-all duration-500 ease-out 
                      ${item.PorcentajeAsistencias >= 50 ? "bg-green-500" : "bg-yellow-500"}"
                style="width:${item.PorcentajeAsistencias}%"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center text-xs 
                          ${item.PorcentajeAsistencias >= 50 ? "text-white" : "text-gray-700"}">
                ${item.PorcentajeAsistencias}%
              </div>

            </div>
          </td>
          <td class="px-2 py-3 text-sm text-center text-gray-700 tracking-tight cursor-pointer">
            <div class="w-full bg-gray-100 h-3 rounded-full relative overflow-hidden shadow-inner">
              <div
                class="h-full rounded-full transition-all duration-500 ease-out 
                      ${item.PorcentajeFaltas >= 25 ? "bg-red-500" : "bg-yellow-500"}"
                style="width:${item.PorcentajeFaltas}%"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center text-xs 
                          ${item.PorcentajeFaltas >= 50 ? "text-white" : "text-gray-700"}">
                ${item.PorcentajeFaltas}%
              </div>

            </div>
          </td>
          <td
            title="Ver informe"
            class="px-2 py-3 text-sm text-center text-gray-700 tracking-tight cursor-pointer group"
          >
              <div class="relative inline-block">
                  <div class="cursor-pointer py-1 flex items-center justify-center gap-2 rounded-full border px-2 transition-all hover:bg-gray-100">
                      <span class="text-lg font-bold group-hover:text-[#2c7988ff]">⋯</span>
                  </div>
                  <ul class="absolute left-0 hidden group-hover:block bg-white border border-gray-200 rounded-md w-40 p-1 shadow-sm z-10">
                      <li class="bg-white text-xs">
                          <a href="#" onclick="verInforme('${item.idGrupo}')" class="block px-2 py-1 hover:bg-gray-100">
                              Ver informe del curso
                          </a>
                      </li>
                  </ul>
              </div>
          </td>


          

        </tr>
      `;
    });
}