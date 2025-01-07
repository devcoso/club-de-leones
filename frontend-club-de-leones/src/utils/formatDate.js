export default function formatDate(dateToFormat) {
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