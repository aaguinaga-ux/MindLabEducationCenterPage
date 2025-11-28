export async function fetchCursos() {
  const res = await fetch('/MindLabEducationCenterPage/data/datosPrueba.json');
  const data = await res.json();

  return data.cursos ?? [];
}
