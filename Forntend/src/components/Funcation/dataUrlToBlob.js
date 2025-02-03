export default function dataUrlToBlob(dataUrl) {
  let byteString;
  if (dataUrl.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataUrl.split(",")[1]);
  else byteString = decodeURI(dataUrl.split(",")[1]);

  let mimString = dataUrl.split(",")[0].split(":")[1].split(";")[0];

  let ai = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ai[i] = byteString.charCodeAt(i);
  }
  return new Blob([ai], { type: mimString });
}
