const convertImagePath = (image: string): string => {
  if (image && typeof image === 'string') {
    if (!image.startsWith("data:image")) {
      const isPng = image.includes("iVBORw0KGgo");
      const base64Prefix = isPng ? "data:image/png;base64," : "data:image/jpeg;base64,";
      return `${base64Prefix}${image}`;
    }
    return image;
  }
  return '/fallback-image.png';
}

export default convertImagePath
