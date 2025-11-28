export async function fetchCursos() {
  const res = await fetch('/data/datosPrueba.json');
  const data = await res.json();

  return data.cursos ?? [];
}
