import * as QRCode from 'qrcode';

export const generateQRCode = async (text: string) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(text);
    return qrCodeDataURL;
  } catch (err) {
    console.error('Erro ao gerar o QR code:', err);
    throw err;
  }
};
