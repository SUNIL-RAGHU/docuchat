const pdfParse = require('pdf-parse');

exports.extractPDFText = async (pdfBuffer) => {
  try {
    const pdfData = await pdfParse(pdfBuffer);
    const textContent = pdfData.text;
    return textContent;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw error;
  }
};