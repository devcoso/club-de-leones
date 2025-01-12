export function formatDate(dateToFormat) {
    // Convertir la cadena a un objeto Date
    if (!dateToFormat) return null
    const date = new Date(dateToFormat);

    // Formatear la fecha y hora
    return date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2) + ' ' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2) + ':' +
    ('0' + date.getSeconds()).slice(-2);
}

  const monthDict = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
  ]

export function formatDateWithHours(fecha) {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = monthDict[fecha.getMonth()]
    const año = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    return `${dia} de ${mes} del ${año} a las ${horas}:${minutos}`;
};