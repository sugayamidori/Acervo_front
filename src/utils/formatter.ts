export const getBase64ImageSrc = (base64String: string, imageType: string): string => {
  if (!base64String || !imageType) {
    console.warn('getBase64ImageSrc: String Base64 ou tipo da imagem ausente.');
    return '';   }
 
  
  if (!imageType.startsWith('image/')) {
    console.warn(`getBase64ImageSrc: Formato do imageType inválido: ${imageType}. Deve começar com "image/".`);
    return ''; 
  }
 
  return `data:${imageType};base64,${base64String}`;
};