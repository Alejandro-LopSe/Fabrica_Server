export function formatearFechaHora(fechaISO: string) {
  const fecha = new Date(fechaISO);
  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Mes comienza en 0
  const dia = fecha.getDate().toString().padStart(2, "0");
  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  return `${dia}/${mes}/${año} - ${horas}:${minutos}`;
}
