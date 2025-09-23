/**
 * Converts a File object to a Base64 encoded string.
 * @param {File} file The file to convert.
 * @returns {Promise<string>} A promise that resolves with the Base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
