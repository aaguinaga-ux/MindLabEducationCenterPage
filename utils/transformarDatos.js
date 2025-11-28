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

export function procesarCursos(cursos) {
  return cursos.map(curso => {
    const total = Number(curso.TotalAlumnos);

    const abandono = total > 0
      ? (Number(curso.TotalAlumnosAbandono) / total) * 100
      : 0;

    const finalizacion = total > 0
      ? (Number(curso.TotalAlumnosGraduados) / total) * 100
      : 0;

    const valoracion = (curso.ValoracionCurso != null && curso.ValoracionCurso > 0) 
    ? `${curso.ValoracionCurso} / 5` 
    : 'Sin datos';

    const clasesValoracion = obtenerClasesValoracion(curso.ValoracionCurso)

    const conversion = (Number(curso.TotalAlumnos / curso.Interesados) * 100).toFixed(2)

    return {
      ...curso,
      TasaAbandono: abandono.toFixed(0),
      TasaFinalizacion: finalizacion.toFixed(0),
      clasesValoracion: clasesValoracion,
      valoracion: valoracion,
      Conversion: conversion
    };
  });
}
