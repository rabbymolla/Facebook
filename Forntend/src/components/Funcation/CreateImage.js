// //profile new img linke data

// export const createImages = (url) => {
//   new Promise((resolve, reject) => {
//     const image = new Image();

//     image.addEventListener("load", () => resolve(image));
//     image.addEventListener("error", (error) => reject(error));
//     image.setAttribute("crossOrigin", "anonymous");
//     image.src = url;
//   });
// };

// export const getRadianAnglle = (degreeValue) => {
//   return (degreeValue * Math.PI) / 180;
// };
// export const rotateSize = (width, height, rotetion) => {
//   const rotRed = getRadianAnglle(rotetion);

//   return {
//     width:
//       Math.abs(Math.cos(rotRed) * width) + Math.abs(Math.sin(rotRed) * height),
//     height:
//       Math.abs(Math.sin(rotRed) * width) + Math.abs(Math.cos(rotRed) * height),
//   };
// };

// export default async function getCropImg(
//   imageSrc,
//   pixelCrop,
//   rotation = 0,
//   flip = { horizontal: false, vertical: false }
// ) {
//   const image = await createImages(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   const rotRed = getRadianAnglle(rotation);
//   const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
//     image.width,
//     image.height,
//     rotation
//   );
//   canvas.width = bBoxWidth;
//   canvas.height = bBoxHeight;
//   ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
//   ctx.rotate(rotRed);
//   ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
//   ctx.translate(-image.width / 2, -image.height / 2);
//   ctx.drawImage(image, 0, 0);
//   const data = ctx.getImageData(
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height
//   );
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;
//   ctx.putImageData(data, 0, 0);

//   return new Promise((resolve, reject) => {
//     canvas.toBlob((file) => {
//       resolve(URL.createObjectURL(file));
//     }, "image/jpeg");
//   });
// }

//chatcpt code

export const createImages = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
};

export const getRadianAngle = (degreeValue) => {
  return (degreeValue * Math.PI) / 180;
};

export const rotateSize = (width, height, rotation) => {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export default async function getCropImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  if (
    !pixelCrop ||
    typeof pixelCrop.x === "undefined" ||
    typeof pixelCrop.y === "undefined"
  ) {
    throw new Error(
      "Invalid or missing 'pixelCrop' parameter. Ensure it has 'x', 'y', 'width', and 'height' properties."
    );
  }

  const image = await createImages(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(data, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve(URL.createObjectURL(file));
      } else {
        reject(new Error("Canvas toBlob failed"));
      }
    }, "image/jpeg");
  });
}
