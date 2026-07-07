// Convert an external image URL to a base64 data URL via canvas
// This avoids CORS issues when exporting with html-to-image
const cache = new Map();

export async function imageToBase64(url) {
  if (!url) return null;
  // Already a data URL
  if (url.startsWith('data:')) return url;
  // Check cache
  if (cache.has(url)) return cache.get(url);

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        const dataUrl = canvas.toDataURL('image/png');
        cache.set(url, dataUrl);
        resolve(dataUrl);
      } catch {
        // CORS blocked even with crossOrigin — fall back to original URL
        resolve(url);
      }
    };
    img.onerror = () => resolve(url);
    img.src = url;
  });
}
