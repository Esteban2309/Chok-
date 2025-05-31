// Utilidad para validación de imágenes
export function isValidImage(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png'];
  return validTypes.includes(file.type) && file.size < 10 * 1024 * 1024;
}
